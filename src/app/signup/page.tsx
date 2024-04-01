import { Divider } from "../ui/components/divider";
import { poppins } from "../ui/fonts";

export default async function Page() {
    return (
        <div className="w-full h-full bg-slate-900 flex flex-col justify-center items-center px-[5%] gap-6 ">
            <h1 className={`${poppins.className} text-5xl antialiased font-bold text-white tracking-wide`}>
                Sign up
            </h1>

            <div className={`${poppins.className} text-sm flex flex-col gap text-white w-full max-w-xl`}>
                <label htmlFor="password">Email</label>
                <input type="text" className="w-full h-12 bg-slate-800 rounded-lg border-solid border-2 border-gray-600 font-sans p-2 text-white" placeholder="example@email.com" />
            </div>

            <div className={`${poppins.className} text-sm flex flex-col gap text-white w-full max-w-xl`}>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" className="w-full max-w-xl h-12 bg-slate-800 rounded-lg border-solid border-2 border-gray-600 font-sans p-2 text-white" placeholder="********" />
            </div>

            <div className={`${poppins.className} text-sm flex flex-col gap text-white w-full max-w-xl`}>
                <label htmlFor="password">Confirm password</label>
                <input type="password" className="w-full max-w-xl h-12 bg-slate-800 rounded-lg border-solid border-2 border-gray-600 font-sans p-2 text-white" placeholder="********" />
            </div>

            <button type="submit" className={`w-full max-w-xl h-12 bg-slate-200 hover:bg-slate-100 rounded-lg border-solid border border-gray-600 ${poppins.className} font-bold text-slate-900`}>create</button>

            <Divider />
        </div>
    )
}