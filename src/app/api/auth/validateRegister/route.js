import pool from "@/app/libs/connection";
import { NextResponse } from "next/server";
import { setCookie } from "@/app/libs/cookie";

export async function POST(req) {
    const data = await req.json();
    const { email, clave } = data;


    const connection = await pool.getConnection();
    const validatelogin = 0
    try {
        const sql = "SELECT idUser FROM users WHERE email = ? and idUser = ? and validatePhone = ?";
        const [rows] = await connection.query(sql, [email, clave, validatelogin]);

        if (rows.length > 0) {

            const sql2 = "update users set validatePhone = ? where idUser = ?";
            const [rows2] = await connection.query(sql2, ["1", rows[0].idUser]);
            await setCookie(rows[0].idUser)
            return NextResponse.json({ ok: true });

        } else {
            return NextResponse.json({ ok: false });
        }

    } catch (error) {
        return NextResponse.json({ error: "Error al iniciar sesion" });
    } finally {
        connection.release();
    }
}
