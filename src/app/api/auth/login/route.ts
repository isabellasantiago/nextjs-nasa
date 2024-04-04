import { conncectToDatabase } from "@/helpers/server-helpers"
import { NextResponse } from "next/server"
import client from "@/prisma/client"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { envs } from "@/helpers/envs"

export const POST = async (req: Request) => {
    try {
        const { email, password } = await req.json()

        if (!email || !password) return NextResponse.json({ message: "Invalid Data" }, { status: 422 })

        await conncectToDatabase()

        const user = await client.user.findFirst({ where: { email } })

        if (!user) return NextResponse.json({ message: "User not registered" }, { status: 404 })

        const isPasswordValid = await bcrypt.compare(password, user?.hashedPassword || '')

        if (!isPasswordValid) return NextResponse.json({ message: 'Invalid password' }, { status: 400 })

        const token = jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email
        }, envs.jwt_secret, { expiresIn: '72h' })


        return NextResponse.json({ token }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Server Error" }, { status: 500 })
    } finally {
        await client.$disconnect()
    }
}