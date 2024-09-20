import pool from "@/app/libs/connection";
import { getID } from "@/app/libs/cookie";
import { NextResponse } from "next/server";

import { generatePassword } from "@/app/libs/generatePassword";

export async function GET(req, { params }) {
    const id = params.id
    const userData = await getID()

    if (!userData) {
        return NextResponse.json({ error: false }, { status: 404 });
    }
    const { company_key } = userData
    const connection = await pool.getConnection();

    try {
        const sql = `select * from alumnos where idCompany = ? and id = ?`;
        const [rows] = await connection.query(sql, [company_key, id]);
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
    const { fullName, birthDate, registerDate, parent_Name, parent, parentEmergency, parentWhatsapp, id } = data
    const userData = await getID()

    if (!userData) {
        return NextResponse.json({ error: false }, { status: 404 });
    }
    const { company_key } = userData
    const connection = await pool.getConnection();

    try {
        if (id > 0) {
            const sql = `update alumnos set fullName=?, birthDate=?, alta_date=?, parent_name=?, parent=?, parent_emergency=?, parent_Whatsapp=? where id =?`;
            const [rows] = await connection.query(sql, [fullName, birthDate, registerDate, parent_Name, parent, parentEmergency, parentWhatsapp, id]);
        } else {

            const sql = `INSERT INTO alumnos (idCompany, fullName, birthDate, alta_date, parent_name, parent, parent_emergency, parent_Whatsapp) values(?,?,?,?,?,?,?,?)`;
            const [rows] = await connection.query(sql, [company_key, fullName, birthDate, registerDate, parent_Name, parent, parentEmergency, parentWhatsapp]);
            const id = rows.insertId
            await generatePassword(id)
        }
        return NextResponse.json({ ok: true })

    } catch (error) {
        return NextResponse.json({ error: "error" });
    } finally {
        connection.release();
    }
}


