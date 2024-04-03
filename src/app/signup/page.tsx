'use client';

import { createAccount } from "../lib/actions";
import { Divider } from "../ui/components/divider";
import { poppins } from "../ui/fonts";
import { useFormState } from 'react-dom';

export default function Page() {
    const initialState = { message: '', errors: {} };
    const [state, dispatch] = useFormState(createAccount, initialState);

    return (
        <div className="w-full h-lsh bg-slate-900 flex flex-col justify-center items-center px-[5%] gap-6 ">
            <h1 className={`${poppins.className} text-5xl antialiased font-bold text-white tracking-wide`}>
                Sign up
            </h1>
            <form action={dispatch} className="w-full flex flex-col justify-center items-center max-w-sm gap-6 ">
                <div className={`${poppins.className} text-sm flex flex-col gap text-white w-full`}>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" className="w-full h-12 bg-slate-800 rounded-lg border-solid border-2 border-gray-600 font-sans p-2 text-white" placeholder="example@email.com" />
                    <div id="email-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.email && state.errors.email.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                            </p>
                        ))}
                    </div>
                </div>
                <div className={`${poppins.className} text-sm flex flex-col gap text-white w-full max-w-xl`}>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" className="w-full max-w-xl h-12 bg-slate-800 rounded-lg border-solid border-2 border-gray-600 font-sans p-2 text-white" placeholder="********" aria-describedby="password-error" />
                    <div id="password-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.password &&
                            state.errors.password.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>
                <div className={`${poppins.className} text-sm flex flex-col gap text-white w-full max-w-xl`}>
                    <label htmlFor="confirmPassword">Confirm password</label>
                    <input type="password" name="confirmPassword" className="w-full max-w-xl h-12 bg-slate-800 rounded-lg border-solid border-2 border-gray-600 font-sans p-2 text-white" placeholder="********" aria-describedby="confirmPassword-error" />
                    <div id="confirPassword-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.confirmPassword &&
                            state.errors.confirmPassword.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>
                <button type="submit" className={`w-full max-w-xl h-12 bg-slate-200 hover:bg-slate-100 rounded-lg border-solid border border-gray-600 ${poppins.className} font-bold text-slate-900`}>create</button>
            </form>

            <Divider size="max-w-sm" />
        </div>
    )
}