"use server"; //이건 서버에서만 동작하도록 함

export const onSubmit = async (currentState: any, formData: FormData) => {
  console.log(currentState, "currentState");
  // "use server"; //이건 서버에서만 동작하도록 함
  await new Promise((resolve) => setTimeout(resolve, 5000));
  console.log("server!!!");
  console.log(formData.get("email"), formData.get("password"));
  return {
    errors: ["wrong password", "password too short"],
  };
};
