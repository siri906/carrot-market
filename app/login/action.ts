"use server"; //이건 서버에서만 동작하도록 함
import { z } from "zod";

const formSchema = z.object({
  email: z.string(),
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

  const result = formSchema.safeParse(data);
  console.log("result", result);
  if (!result.success) {
    // flatten: 에러를 보다 쉽게 관리 할 수 있게 해줌
    // console.log("result.error", result.error.flatten());
    return result.error.flatten();
  } else {
    console.log("result.data", result.data);
  }
};
