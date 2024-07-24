"use client";

import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { createAccount } from "./action";

export default function CreateAccount() {
  const [state, dispatch] = useFormState(createAccount, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요</h1>
        <h2 className="text-xl">fill in the form below to join!</h2>
      </div>
      <div>
        <form className="flex flex-col gap-3" action={dispatch}>
          <FormInput name="username" type="text" placeholder="Username" required />
          <FormInput name="email" type="email" placeholder="Email" required />
          <FormInput name="password" type="password" placeholder="password" required />
          <FormInput name="confirmPassword" type="password" placeholder="confirm password" required />
          <FormButton text="Create Account" />
        </form>
      </div>
      <SocialLogin />
    </div>
  );
}
