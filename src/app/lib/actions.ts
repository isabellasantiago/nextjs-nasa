'use server'
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { conncectToDatabase } from '@/helpers/server-helpers';
import client from '@/prisma/client';
import { signIn } from '../../../auth';
import { AuthError } from 'next-auth';

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

    
    try {
        await conncectToDatabase()
        await client.user.create()
        
    } catch (error: any) {
        return {
            message: `${error.message}`,
        };
    } finally {
        await client.$disconnect()
        redirect('/login')
    }
}


export async function authenticate(prevState: string | undefined,
    formData: FormData) {
    try {
        await signIn('credentials', formData);
      } catch (error) {
        if (error instanceof AuthError) {
          switch (error.type) {
            case 'CredentialsSignin':
              return 'Invalid credentials.';
            default:
              return 'Something went wrong.';
          }
        }
        throw error;
      }
}