import Image from "next/image";
import LoginComponent from "./ui/components/login";

export default function Home() {
  return (
    <main className="flex min-h-screen h-full flex-col items-center justify-between">
      <div className="w-full h-screen items-center justify-end font-mono text-sm lg:flex p-0 ">
        <div className="hidden lg:block w-full max-w-2xl">
          <h1 className="font-sans text-3xl antialised font-bold">Worried about the <span className="italic uppercase">next</span> image?</h1>
          <span className="font-sans text-lg">No need! NASA will tell you which one it is 👀</span>
        </div>
        <LoginComponent />
      </div>
    </main>
  );
}
