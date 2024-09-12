import pool from "@/app/libs/connection";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getID, setCookie } from "@/app/libs/cookie";

export async function POST(req) {
    const data = await req.json();
    const { email, password, fullname, birthdate, phone } = data;


    const hashedPassword = await bcrypt.hash(password, 10);

    const connection = await pool.getConnection();
    try {
        const sql =
            "INSERT INTO users (fullname, birthdate, email, password,phone,validatePhone, rol) VALUES (?, ?, ?, ?,?,?,?)";


        const [rows, fields] = await connection.query(sql, [fullname, birthdate, email, hashedPassword, phone, "0", "user"]);



        if (rows) {
            const sql2 = "SELECT * FROM users WHERE email = ?";
            const [rows2] = await connection.query(sql2, [email]);

            if (rows2.length > 0) {
                const user = rows2[0];
                const passwordMatch = await bcrypt.compare(password, user.password);

                if (passwordMatch) {
                    // await setCookie(rows2[0].idUser)

                    const sql3 = "insert into gptLimits (idUser, gptlimit, gptrequest) values(?, ?, ?)";
                    const [rows3] = await connection.query(sql3, [rows2[0].idUser, '10', '0']);
                    const sql4 = "insert into related_User_company (user_id, company_key ) values(?, ?)";
                    const [rows4] = await connection.query(sql4, [rows2[0].idUser, '4ca34e27-671a-11ef-a613-3fb2c1ae28b9']);

                    return NextResponse.json({ ok: true });
                } else {
                    return NextResponse.json({ ok: false });
                }
            } else {
                return NextResponse.json({ ok: false });
            }
        } else {
            return NextResponse.json({ ok: false });
        }
    } catch (error) {
        return NextResponse.json({ error: "Error al crear la cuenta" });
    } finally {
        connection.release();
    }
}
