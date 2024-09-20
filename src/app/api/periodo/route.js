import pool from "@/app/libs/connection";
import { getID } from "@/app/libs/cookie";
import { NextResponse } from "next/server";

export async function GET(req) {

    const userData = await getID()

    if (!userData) {
        return NextResponse.json({ error: false }, { status: 404 });
    }
    const { company_key } = userData
    const connection = await pool.getConnection();

    try {
        const sql = `select * from periodo where idCompany = ?`;
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



export async function POST(req) {
    const data = await req.json()
    const { nombre, startDate, endDate, proximamente, id } = data
    const userData = await getID()

    if (!userData) {
        return NextResponse.json({ error: false }, { status: 404 });
    }
    const { company_key } = userData
    const connection = await pool.getConnection();

    try {
        if (id > 0) {
            const sql = `update periodo set nombre=?, startDate=?, endDate=?, proximamente=?, where id =?`;
            const [rows] = await connection.query(sql, [nombre, startDate, endDate, proximamente, id]);
        } else {

            const sql = `INSERT INTO periodo (idCompany, nombre, startDate, endDate, proximamente) values(?,?,?,?,?)`;
            const [rows] = await connection.query(sql, [company_key, nombre, startDate, endDate, proximamente]);

        }
        return NextResponse.json({ ok: true })

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
        const sql = `DELETE FROM periodo WHERE id = ?`;
        const [rows] = await connection.query(sql, [id]);
        return NextResponse.json({ ok: true })

    } catch (error) {
        return NextResponse.json({ error: "error" });
    } finally {
        connection.release();
    }
}

