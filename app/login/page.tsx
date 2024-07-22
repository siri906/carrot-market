import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";

export default function Login() {
  const onSubmit = async (formData: FormData) => {
    "use server"; //이건 서버에서만 동작하도록 함
    console.log("server!!!");
    console.log(formData.get("email"), formData.get("password"));
  };
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요</h1>
        <h2 className="text-xl">Login with email and pass</h2>
      </div>
      <div>
        <form action={onSubmit} className="flex flex-col gap-3">
          <FormInput name="email" type="email" placeholder="Email" required errors={[]} />
          <FormInput name="password" type="password" placeholder="password" required errors={[]} />
          <FormButton loading={false} text="Login" />
        </form>
      </div>
      <SocialLogin />
    </div>
  );
}
