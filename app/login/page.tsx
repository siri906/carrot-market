"use client";

import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";
import { onSubmit } from "./action";
import { useFormState } from "react-dom";
import { useActionState } from "react";

export default function Login() {
  const [state, formAction] = useFormState(onSubmit, null);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요</h1>
        <h2 className="text-xl">Login with email and pass</h2>
      </div>
      <div>
        <form action={formAction} className="flex flex-col gap-3">
          <FormInput name="email" type="email" placeholder="Email" required />
          <FormInput name="password" type="password" placeholder="password" required />
          <FormButton text="Login" />
        </form>
      </div>
      <SocialLogin />
    </div>
  );
}
