import { generatePassword } from "@/app/libs/generatePassword"

export async function POST(req) {

    const data = await req.json()
    const { id } = data

    await generatePassword(id)
}