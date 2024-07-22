import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";

export default function SMSLogin() {
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Login</h1>
        <h2 className="text-xl">Verify for your number</h2>
      </div>
      <div>
        <form className="flex flex-col gap-3">
          <FormInput type="number" placeholder="phoneNumber" required errors={[]} />
          <FormInput type="number" placeholder="Verification Code" required errors={[]} />
          <FormButton loading={false} text="Verify" />
        </form>
      </div>
    </div>
  );
}
