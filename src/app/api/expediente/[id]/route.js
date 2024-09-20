import pool from "@/app/libs/connection";
import { getID } from "@/app/libs/cookie";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {

    const userData = await getID()

    if (!userData) {
        return NextResponse.json({ error: false }, { status: 404 });
    }
    const id_Alumno = params.id
    const connection = await pool.getConnection();

    try {
        const sql = `select * from evaluation where id_alumno = ?`;
        const [rows] = await connection.query(sql, [id_Alumno]);
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



export async function POST(req, { params }) {
    const data = await req.json()
    const id_Alumno = params.id
    const { trabajo_en_equipo, esfuerzo, energia, companerismo, actitud, conduccion, recepcion, pase, desplazamiento, tiro, periodo, id } = data
    const userData = await getID()

    if (!userData) {
        return NextResponse.json({ error: false }, { status: 404 });
    }
    const connection = await pool.getConnection();

    try {
        if (id > 0) {
            const sql = `update evaluation set trabajo_en_equipo=?, esfuerzo=?, energia=?, companerismo=?, actitud=?, conduccion=?, recepcion=?, pase=?, desplazamiento=?, tiro=?, periodo=? where id =?`;
            const [rows] = await connection.query(sql, [trabajo_en_equipo, esfuerzo, energia, companerismo, actitud, conduccion, recepcion, pase, desplazamiento, tiro, periodo, id]);
        } else {

            const sql = `INSERT INTO evaluation (id_alumno,trabajo_en_equipo, esfuerzo, energia, companerismo, actitud, conduccion, recepcion, pase, desplazamiento, tiro, periodo) values(?,?,?,?,?,?,?,?,?,?,?,?)`;
            const [rows] = await connection.query(sql, [id_Alumno, trabajo_en_equipo, esfuerzo, energia, companerismo, actitud, conduccion, recepcion, pase, desplazamiento, tiro, periodo]);

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
    console.log(id)
    if (!userData) {
        return NextResponse.json({ error: false }, { status: 404 });
    }

    const connection = await pool.getConnection();

    try {
        const sql = `DELETE FROM evaluation WHERE id = ?`;
        const [rows] = await connection.query(sql, [id]);

        return NextResponse.json({ ok: true })

    } catch (error) {
        return NextResponse.json({ error: "error" });
    } finally {
        connection.release();
    }
}

