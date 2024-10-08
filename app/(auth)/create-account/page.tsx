"use client";

import Button from "@/components/form-btn";
import Input from "@/components/form-input";
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
          <Input name="username" type="text" placeholder="Username" errors={state?.fieldErrors.username} required />
          <Input name="email" type="email" placeholder="Email" errors={state?.fieldErrors.email} required />
          <Input name="password" type="password" placeholder="password" errors={state?.fieldErrors.password} required />
          <Input name="confirmPassword" type="password" placeholder="confirm password" errors={state?.fieldErrors.confirmPassword} required />
          <Button text="Create Account" />
        </form>
      </div>
      <SocialLogin />
    </div>
  );
}
