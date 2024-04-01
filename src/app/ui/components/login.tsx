import { poppins } from "../fonts";
import Link from 'next/link'
import { Divider } from "./divider";

export default async function LoginComponent() {
    return (
        <div className="w-full h-full lg:w-2/5  max-w-xl bg-slate-900 flex flex-col justify-center items-center px-[5%] gap-6 ">
            <h1 className={`${poppins.className} text-5xl antialiased font-bold text-white tracking-wide`}>
                Login
            </h1>
            <input type="text" className="w-full h-12 bg-slate-800 rounded-lg border-solid border-2 border-gray-600 font-sans p-2 text-white" placeholder="example@email.com" />

            <input type="password" className="w-full h-12 bg-slate-800 rounded-lg border-solid border-2 border-gray-600 font-sans p-2 text-white" placeholder="********" />

            <button type="submit" className={`w-full h-12 bg-slate-200 hover:bg-slate-100 rounded-lg border-solid border border-gray-600 ${poppins.className} font-bold text-slate-900`}>Login</button>
            <Divider />
            <span className={`${poppins.className} text-gray-400 text-xs`}>Don't you have an account? <Link href="/signup" className="hover:text-gray-300">Sign up</Link></span>
        </div>
    )
}