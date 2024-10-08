"use client";

import { useFormStatus } from "react-dom";

interface FormButtonProps {
  loading?: boolean;
  text: string;
}

export default function Button({ loading, text }: FormButtonProps) {
  // 이 hook 은 form 의 자식 요소에만 사용할 수 있다.
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} className="primary-btn h-10 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed">
      {pending ? "로딩 중.." : text}
    </button>
  );
}
