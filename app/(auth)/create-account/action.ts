"use server";
import bcrypt from "bcrypt";
import db from "@/lib/db";
import { z } from "zod";
import { redirect } from "next/navigation";
import getSession from "@/lib/session";

const passwordRegex = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/);

// const usernameSchema = z.string().min(5).max(10);
const checkUsername = (username: string) => !username.includes("test");

const checkUniqueUsername = async (username: string) => {
  //check if username is taken
  const user = await db.user.findUnique({
    where: {
      username,
    },
    // 일치하는 값중에서 특정 col값만 가져오겠다
    select: {
      id: true,
    },
  });
  return !Boolean(user);
};

const checkUniqueEmail = async (email: string) => {
  const userEmail = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      email: true,
    },
  });
  return !Boolean(userEmail);
};

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "username must be string",
        required_error: "where is my username? ",
      })
      .min(1, "username is too short")
      .max(10, "username is too long"),
    // transform 아예 값을 넘겨줌 변환된 값을 넘겨줄 수 있음, 애는 꼭 뭔가 return을 해줘야함
    // .transform((username) => `🔥 ${username}`)
    // .transform((username) => `${username}`)
    //refine 값에 따라 참 거짓을 넘겨줌
    //refine 하면 한번에 2번 db조회해야됨 그래서 안 좋음
    // .refine(checkUsername, "test noeno")
    // .refine(checkUniqueUsername, "username already taken"),

    // email: z.string().email().toLowerCase().refine(checkUniqueEmail, "email already taken"),
    // password: z.string().regex(passwordRegex, "At least one uppercase letter, one lowercase letter, one number and one special character"),
    email: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "사용자명이 이미 사용중",
        path: ["username"],

        fatal: true,
      });
      // 뒤에 refine이 있어도 동작하지 않음
      return z.NEVER;
    }
  })
  // 괄호로 하는 이유는 하단 메시지가 어디에 나타나야하는지 알아야하기 떄문에 저런식으로 나타냄 path 는 오류가 나타나야 할 곳
  .refine(({ password, confirmPassword }) => password === confirmPassword, { message: "both passwords should be the same", path: ["confirmPassword"] });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  // console.log(data);

  // 데이터의 조건
  // usernameSchema.parse(data.username);

  //   [.parse]
  // data의 타입이 유효한지 검사하기 위해 .parse 메소드를 사용할 수 있습니다. 유효한 경우 데이터 전체 정보가 포함된 값이 반환됩니다. 유효하지 않은 경우, 에러가 발생합니다. 보통 try-catch 문으로 감싸서 사용한다고 합니다.

  // try {
  //   formSchema.parse(data);
  // } catch (error) {
  //   console.log(error);
  // }

  // [.safeParse]
  // .parse를 사용할 때 타입이 유효하지 않은 경우 Zod가 에러를 발생시키는 것을 원하지 않는다면, .safeParse를 사용하면 됩니다.
  //   데이터가 유효한 경우 true값의 success와 데이터 정보가 담긴 data를 반환합니다.
  // 유효하지 않은 경우에는 false값의 success와 에러 정보가 담긴 error를 반환합니다.

  const result = await formSchema.safeParseAsync(data);
  console.log("result", result);
  if (!result.success) {
    // flatten: 에러를 보다 쉽게 관리 할 수 있게 해줌
    // console.log("result.error", result.error.flatten());
    return result.error.flatten();
  } else {
    // console.log("result.data", result.data);
    //check if email already used
    //hash password
    // 해싱이란  입력값을 못생기게 만드는 거다,(알수없게) 해시 함수는 단방향이다
    // 해싱을 한번만 하는게 아님 (원하는 만큼)
    //  암호화는 양방향이 가능하다
    //참고 url https://youtu.be/67UwxR3ts2E?si=2pqx4IUADxyAzoUj
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    // console.log(hashedPassword);
    //save user db
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
    //log the user in (세션 쿠키 관련 url https://www.youtube.com/watch?v=tosLBcAX1vk)
    const session = await getSession();

    session.id = user.id;
    await session.save();

    redirect("/profile");
    // redireact "/home"
  }
}
