export default function Home() {
  return (
    <main className="bg-gray-100 h-screen flex items-center justify-center p-5 sm:bg-red-200 ">
      <div className="bg-white w-full shadow-lg p-5 rounded-3xl max-w-screen-sm dark:bg-gray-600 flex flex-col gap-2 *:outline-none">
        {/* <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-gray-700 font-semibold -mb-2 dark:text-gray-300">In transit</span>
            <span className="text-4xl font-semibold dark:text-white">Cool blue</span>
          </div>
          <div className="size-12 rounded-full bg-orange-400" />
        </div>
        <div className="my-2 flex items-center gap-2">
          <span className="bg-green-400 text-white rounded-full px-3 py-1 text-s font-medium hover:bg-green-500 hover:scale-125 transition">Today</span>
          <span className="dark:text-gray-100">9:00 ~ 10:30</span>
        </div>
        <div className="relative">
          <div className="bg-gray-200 w-full h-2 rounded-2xl absolute" />
          <div className="bg-green-400 w-2/3 h-2 rounded-2xl absolute" />
        </div>
        <div className="flex justify-between items-center mt-5 text-gray-700 dark:text-gray-300">
          <span>test1</span>
          <span>test2</span>
          <span>test3</span>
          <span className="text-gray-400 dark:text-gray-500">test4</span>
        </div> */}
        <input required className="w-full rounded-full h-10 bg-gray-200 pl-5 py-3 outline-none ring ring-transparent focus:ring-orange-400 ring-offset-2 transition-shadow placeholder:text-orange-400 invalid:focus:bg-red-100 peer" type="email" placeholder="Search here...." />
        <span className="hidden text-red-400 peer-invalid:block">이메일 적어라</span>
        <button className="bg-gradient-to-tr from-cyan-500 via-yellow-400 to-purple-400 text-white rounded-full active:scale-90 transition-transform py-2 font-medium focus:scale-90 outline-none  peer-invalid:bg-slate-600">Search</button>
      </div>
    </main>
  );
}
