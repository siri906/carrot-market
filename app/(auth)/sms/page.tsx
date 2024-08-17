"use client";

import Button from "@/components/form-btn";
import Input from "@/components/form-input";
import { useFormState } from "react-dom";
import { smsLogin } from "./action";

const initialState = {
  token: false,
  error: undefined,
};

export default function SMSLogin() {
  const [state, dispatch] = useFormState(smsLogin, initialState);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Login</h1>
        <h2 className="text-xl">Verify for your number</h2>
      </div>
      <div>
        <form action={dispatch} className="flex flex-col gap-3">
          {state.token ? <Input name="token" type="number" placeholder="Verification Code" required errors={state.error?.formErrors} /> : <Input name="phone" type="number" placeholder="phoneNumber" required errors={state.error?.formErrors} />}
          <Button loading={false} text={state.token ? "Verify token" : "send sms"} />
        </form>
      </div>
    </div>
  );
}
