import Link from "next/link";
// import "@/lib/db";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-10">
      <div className="flex flex-col items-center my-auto gap-2 *:font-medium">
        <span className="text-9xl">🥕</span>
        <h1 className="text-4xl">당근</h1>
        <h2 className="text-2xl">당근 마켓에 어서오세요.</h2>
      </div>
      <div className="flex flex-col items-center gap-3 w-full">
        <Link className="primary-btn py-2.5 text-lg" href={"/create-account"}>
          시작하기
        </Link>
        <div className="flex gap-2">
          <span>이미 계정이 있나요?</span>
          <Link href={"login"} className=" hover:underline underline-offset-4">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
