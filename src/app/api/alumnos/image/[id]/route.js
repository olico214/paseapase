import pool from "@/app/libs/connection";
import { getID } from "@/app/libs/cookie";
import { NextResponse } from "next/server";

import { generatePassword } from "@/app/libs/generatePassword";

export async function PUT(req, { params }) {
    const id = params.id
    const userData = await getID()

    if (!userData) {
        return NextResponse.json({ error: false }, { status: 404 });
    }
    const { company_key } = userData
    const connection = await pool.getConnection();

    try {
        const sql = `update alumnos set url=? where id =?`;
        const [rows] = await connection.query(sql, [null, id]);
        return NextResponse.json({ ok: true })

    } catch (error) {
        return NextResponse.json({ error: "error" });
    } finally {
        connection.release();
    }
}


export async function POST(req) {
    const data = await req.json()
    const { url, id } = data
    const userData = await getID()

    if (!userData) {
        return NextResponse.json({ error: false }, { status: 404 });
    }
    const { company_key } = userData
    const connection = await pool.getConnection();

    try {
        const sql = `update alumnos set url=? where id =?`;
        const [rows] = await connection.query(sql, [url, id]);
        return NextResponse.json({ ok: true })

    } catch (error) {
        return NextResponse.json({ error: "error" });
    } finally {
        connection.release();
    }
}



export async function GET(req, { params }) {
    const id = params.id
    const userData = await getID()
    if (!userData) {
        return NextResponse.json({ error: false }, { status: 404 });
    }
    const { company_key } = userData
    const connection = await pool.getConnection();

    try {
        const sql = `select url from alumnos  where id =?`;
        const [rows] = await connection.query(sql, [id]);
        return NextResponse.json({ ok: true })

    } catch (error) {
        return NextResponse.json({ error: "error" });
    } finally {
        connection.release();
    }
}

