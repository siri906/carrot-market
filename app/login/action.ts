"use server"; //이건 서버에서만 동작하도록 함
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user);
};

const formSchema = z.object({
  email: z.string().refine(checkEmailExists, "이메일 계정이 없습니다."),
  password: z.string(),
});

export const login = async (currentState: any, formData: FormData) => {
  // console.log(currentState, "currentState");
  // "use server"; //이건 서버에서만 동작하도록 함
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  // console.log("server!!!");
  // console.log(formData.get("email"), formData.get("password"));
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = await formSchema.safeParseAsync(data);
  console.log("result", result);
  if (!result.success) {
    // flatten: 에러를 보다 쉽게 관리 할 수 있게 해줌
    // console.log("result.error", result.error.flatten());
    return result.error.flatten();
  } else {
    // console.log("result.data", result.data);
    // email 사용자 찾기
    // 유저 찾았으면 비밀번호 hash
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    const ok = await bcrypt.compare(result.data.password, user!.password ?? "");
    console.log("ok", ok);
    if (ok) {
      // 유저 로그인 시키고 프로파일로 이동
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      redirect("/profile");
    } else {
      return {
        fieldErrors: {
          password: ["잘못된 비밀번호"],
          email: [],
        },
      };
    }
  }
};
