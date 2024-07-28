import { InputHTMLAttributes } from "react";

interface FormInputProps {
  name: string;
  errors?: string[];
}

export default function Input({ errors = [], name, ...rest }: FormInputProps & InputHTMLAttributes<HTMLInputElement>) {
  console.log(rest, "rest");
  return (
    <div className="flex flex-col gap-2">
      <input name={name} className="p-5 bg-transparent rounded-md w-full h-10 focus:outline-none ring-2 border-none focus:ring-4 ring-neutral-200 focus:ring-orange-500 transition" {...rest} />
      {errors.map((error, idx) => {
        return (
          <span key={idx} className="text-red-500 font-medium">
            {error}
          </span>
        );
      })}
    </div>
  );
}
