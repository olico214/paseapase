import pool from "@/app/libs/connection";
import { NextResponse } from "next/server";
import { setCookie } from "@/app/libs/cookie";

export async function POST(req) {
    const data = await req.json();
    const { email } = data;


    const connection = await pool.getConnection();
    const validatelogin = 1
    try {
        const sql = "SELECT email FROM users WHERE email = ?  and validatePhone = ?";
        const [rows] = await connection.query(sql, [email, validatelogin]);

        if (rows.length > 0) {

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




export async function PUT(req) {
    const data = await req.json();
    const { email, clave } = data;



    const connection = await pool.getConnection();
    const validatelogin = 1
    try {
        const sql =
            "SELECT idUser FROM users WHERE email = ?  AND idUser =? and validatePhone = ?";


        const [rows, fields] = await connection.query(sql, [email, clave, validatelogin]);

        if (rows.length > 0) {
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
