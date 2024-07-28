"use client";

import Button from "@/components/form-btn";
import Input from "@/components/form-input";
import SocialLogin from "@/components/social-login";
import { login } from "./action";
import { useFormState } from "react-dom";
import { useActionState } from "react";

export default function Login() {
  const [state, formAction] = useFormState(login, null);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요</h1>
        <h2 className="text-xl">Login with email and pass</h2>
      </div>
      <div>
        <form action={formAction} className="flex flex-col gap-3">
          <Input name="email" type="email" placeholder="Email" required />
          <Input name="password" type="password" placeholder="password" required />
          <Button text="Login" />
        </form>
      </div>
      <SocialLogin />
    </div>
  );
}
