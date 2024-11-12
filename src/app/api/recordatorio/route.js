import pool from "@/app/libs/connection";
import { getID } from "@/app/libs/cookie";
import { NextResponse } from "next/server";

export async function POST(req) {
    const data = await req.json()
    const { fecha, comentario, id } = data
    const status = 1
    const userData = await getID()

    if (!userData) {
        return NextResponse.json({ error: false }, { status: 404 });
    }
    const connection = await pool.getConnection();

    try {
        const sqlUpdate = `update recordatorio set  status=? `;
        const [rowsUpdate] = await connection.query(sqlUpdate, [0]);
        const sqlInsert = `INSERT INTO recordatorio (fecha, comentario, status) values(?,?,?)`;
        const [rows] = await connection.query(sqlInsert, [fecha, comentario, status, id]);

        return NextResponse.json({ ok: true })

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
        const sql = `select * from recordatorio order by id desc`;
        const [rows] = await connection.query(sql, [company_key]);
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




export async function DELETE(req) {
    const data = await req.json()
    const { id } = data

    const userData = await getID()

    if (!userData) {
        return NextResponse.json({ error: false }, { status: 404 });
    }
    const connection = await pool.getConnection();

    try {
        const sqlDelete = `DELETE from recordatorio where id = ? `;
        const [rows] = await connection.query(sqlDelete, [id]);

        return NextResponse.json({ ok: true })

    } catch (error) {
        return NextResponse.json({ error: "error" });
    } finally {
        connection.release();
    }
}

