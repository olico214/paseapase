import pool from "@/app/libs/connection";
import { NextResponse } from "next/server";
import { getID } from "@/app/libs/cookie";

export async function POST(req) {
    const data = await req.json()
    const { id } = data
    try {

        const userData = await getID();

        if (!userData) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const { user_id } = userData;
        const connection = await pool.getConnection();

        try {

            const query = `select t1.id from admin_navigation t0 LEFT join admin_page t1 on t1.id = t0.idPage WHERE t0.idUser = ?`;
            const [result] = await connection.query(query, [id]);

            return NextResponse.json({ data: result });
        } catch (error) {

            console.error(error);
            return NextResponse.json({ error: "An error occurred" }, { status: 500 });
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
}

