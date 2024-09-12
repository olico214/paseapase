import pool from "@/app/libs/connection";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { setCookie } from "@/app/libs/cookie";

export async function POST(req) {
    const data = await req.json();
    const { email, password } = data;


    const connection = await pool.getConnection();
    const validatelogin = 1
    try {
        const sql = "SELECT idUser, password FROM users WHERE email = ? and validatePhone = ?";
        const [rows] = await connection.query(sql, [email, validatelogin]);

        if (rows.length > 0) {
            const user = rows[0];
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                await setCookie(rows[0].idUser)
                return NextResponse.json({ ok: true });

            } else {
                return NextResponse.json({ ok: false });
            }
        } else {
            return NextResponse.json({ ok: false });
        }

    } catch (error) {
        return NextResponse.json({ error: "Error al iniciar sesion" });
    } finally {
        connection.release();
    }
}
