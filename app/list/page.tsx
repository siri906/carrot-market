export default function Page() {
  return (
    <main className="bg-gray-100 h-screen flex items-center justify-center p-5  ">
      <div className="bg-white w-full shadow-lg p-5 rounded-3xl max-w-screen-sm flex flex-col gap-2 *:outline-none has-[.peer]:bg-green-300">
        {["test1", "test2", "test3", "test4"].map((person, index) => {
          return (
            <div key={index} className="flex items-center gap-3 group">
              <div className="flex items-center size-10 bg-blue-400 rounded-full"></div>
              <span className="text-lg font-medium group-hover:text-red-400">{person}</span>
              {/* <div className="animate-bounce size-6 bg-red-500 text-white flex items-center justify-center rounded-full">
                <span>{index}</span>
              </div> */}
              <div className="relative size-6 bg-red-500 text-white flex items-center justify-center  rounded-sexy-name">
                <span className="z-10">{index}</span>
                <span className="animate-ping size-6 bg-red-500 text-white flex items-center justify-center rounded-full absolute"></span>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
