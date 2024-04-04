'use client'
import { poppins } from "../fonts";
import Link from 'next/link'
import { Divider } from "./divider";
import { authenticate } from "@/app/lib/actions";
import { useFormState, useFormStatus } from 'react-dom';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

export default function LoginComponent() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);
    const { pending } = useFormStatus();

    return (
        <div className="w-full h-full lg:w-2/5  max-w-xl bg-slate-900 flex flex-col justify-center items-center px-[5%] gap-6 ">
            <h1 className={`${poppins.className} text-5xl antialiased font-bold text-white tracking-wide`}>
                Login
            </h1>
            <form className="w-full flex flex-col justify-center items-center gap-6" action={dispatch}>
                <input type="email" id="email" name="email" className="w-full h-12 bg-slate-800 rounded-lg border-solid border-2 border gray-600 font-sans p-2 text-white" placeholder="example@email.com" />
                <input type="password" id="password" name="password" className="w-full h-12 bg-slate-800 rounded-lg border-solid border-2 border-gray-600 font-sans p-2 text-white" placeholder="********" />
                <button type="submit" aria-disabled={pending} className={`w-full h-12 bg-slate-200 hover:bg-slate-100 rounded-lg border-solid border border-gray-600 ${poppins.className} font-bold text-slate-900`}>Login</button>
                <Divider />
                <span className={`${poppins.className} text-gray-400 text-xs`}>Don't you have an account? <Link href="/signup" className="hover:text-gray-300">Sign up</Link></span>
            </form>
            <div
                className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
            >
                {errorMessage && (
                    <>
                        <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                        <p className="text-sm text-red-500">{errorMessage}</p>
                    </>
                )}
            </div>
        </div>
    )
}