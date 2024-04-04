import client from "../prisma/client"

export const conncectToDatabase = async () => {
    try {
        await client.$connect()
    } catch (error) {
        console.log(error)
        throw new Error("Unable to connect to database")
    }
}