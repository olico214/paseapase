import pool from "@/app/libs/connection";
import { NextResponse } from "next/server";
import { getID, setCookie } from "@/app/libs/cookie";

export async function POST(req) {
    const data = await req.json();
    const { url, icon, des, name, id } = data;

    const userData = await getID()

    if (!userData) {
        return NextResponse.json({ error: false }, { status: 404 });
    }

    const connection = await pool.getConnection();

    try {



        if (id) {
            const sql = `UPDATE admin_page SET url =?,name=?, icon=?, description=?  WHERE id = ?`;
            const [rows] = await connection.query(sql, [url, name, icon, des, id]);

            return NextResponse.json({ data: rows });

        } else {

            const sql = `insert into admin_page (	url,name, icon, description) values(?, ?, ?, ?)`;
            const [rows] = await connection.query(sql, [url, name, icon, des]);
            return NextResponse.json({ ok: true });
        }

    } catch (error) {
        return NextResponse.json({ error: "error" });
    } finally {
        connection.release();
    }
}





export async function DELETE(req) {
    const data = await req.json();
    const { id } = data;
    console.log(id)
    const userData = await getID()

    if (!userData) {
        return NextResponse.json({ error: false }, { status: 404 });
    }

    const connection = await pool.getConnection();
    try {

        if (id) {
            const sql = `DELETE FROM admin_page WHERE id = ?`;
            const [rows] = await connection.query(sql, [id]);

            if (rows.length > 0) {
                return NextResponse.json({ OK: true });
            } else {
                return NextResponse.json({ ok: false });
            }

        }

    } catch (error) {
        return NextResponse.json({ error: "error" });
    } finally {
        connection.release();
    }
}








export async function GET(req) {

    const userData = await getID()

    if (!userData) {
        return NextResponse.json({ error: false }, { status: 404 });
    }
    const { company_key } = userData
    const connection = await pool.getConnection();

    try {




        const sql = `select * from admin_page`;
        const [rows] = await connection.query(sql, []);
        // console.log(rows)
        if (rows.length > 0) {
            return NextResponse.json({ data: rows });
        } else {
            return NextResponse.json({ data: [] });
        }

    } catch (error) {
        return NextResponse.json({ error: "error" });
    } finally {
        connection.release();
    }
}
