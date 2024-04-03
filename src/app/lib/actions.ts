'use server'
import { z } from 'zod';
import { redirect } from 'next/navigation';

export type State = {
    errors?: {
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
    };
    message?: string | null;
};

const FormSchema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'At least 8 characters'),
    confirmPassword: z.string().min(8, 'At least 8 characters')
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
});

export async function createAccount(prevState: State, formData: FormData) {
    const validatedFields = FormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword')
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create An Account.',
        };
    }

    const { email, password } = validatedFields.data;

    //TODO - insertion into database
    try {
        //do something
        console.log(validatedFields.data)
    } catch (error: any) {
        return {
            message: `${error.message}`,
        };
    }
    redirect('/login')
}


export async function login() { }