interface FormInputProps {
  type: string;
  placeholder: string;
  required: boolean;
  errors: string[];
  name: string;
}

export default function FormInput({ type, placeholder, required, errors, name }: FormInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <input name={name} className="p-5 bg-transparent rounded-md w-full h-10 focus:outline-none ring-2 border-none focus:ring-4 ring-neutral-200 focus:ring-orange-500 transition" type={type} placeholder={placeholder} required={required} />
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
