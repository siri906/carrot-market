export default function Home() {
  return (
    <main className="bg-gray-300 h-screen flex items-center justify-center p-5">
      <div className="bg-white w-full shadow-lg p-5 rounded-2xl">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-gray-500 font-semibold -mb-2">In transit</span>
            <span className="text-4xl font-semibold">Cool blue</span>
          </div>
          <div className="size-12 rounded-full bg-orange-400" />
        </div>
        <div className="my-2 flex items-center gap-2">
          <span className="bg-green-400 text-white rounded-full px-3 py-1 text-s font-medium ">Today</span>
          <span>9:00 ~ 10:30</span>
        </div>
        <div className="relative">
          <div className="bg-gray-200 w-full h-2 rounded-2xl absolute" />
          <div className="bg-green-400 w-2/3 h-2 rounded-2xl absolute" />
        </div>
        <div className="flex justify-between items-center mt-5 text-gray-500">
          <span>test1</span>
          <span>test2</span>
          <span>test3</span>
          <span className="text-gray-400">test4</span>
        </div>
      </div>
    </main>
  );
}
