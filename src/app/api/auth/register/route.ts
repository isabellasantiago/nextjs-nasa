import { conncectToDatabase } from "@/helpers/server-helpers"
import { NextResponse } from "next/server"
import client from "../../../../prisma/client"
import bcrypt from 'bcrypt'
import { z } from 'zod';

export const POST = async (req: Request) => {
    try {
        const { name, email, password, confirmPassword } = await req.json()
        const parsedDatas = z.object({
            email: z.string().email('Invalid email'),
            password: z.string().min(8, 'At least 8 characters'),
            confirmPassword: z.string().min(8, 'At least 8 characters')
        }).refine((data) => data.password === data.confirmPassword, {
            message: "Passwords don't match",
            path: ["confirmPassword"], // path of error
        }).safeParse({
            name,
            email,
            password,
            confirmPassword
        })
        if (!parsedDatas.success) {
            const errors = parsedDatas.error.flatten().fieldErrors;              
            return NextResponse.json({
            errors: parsedDatas.error.flatten().fieldErrors,
            message: `Inavlid data: ${Object.keys(errors).join(", ")}`,
        })
    }

        if (password === confirmPassword) return NextResponse.json({
            message: 'passwords must match'
        }, { status: 400 })

        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(password, salt)
        await conncectToDatabase()
        const user = await client.user.create({ data: { email, name, hashedPassword } })

        return NextResponse.json({ user }, { status: 201 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Server Error" }, { status: 500 })
    } finally {
        await client.$disconnect()
    }
}