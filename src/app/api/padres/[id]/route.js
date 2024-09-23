import pool from "@/app/libs/connection";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const id = params.id

    const connection = await pool.getConnection();

    try {


        const sql = `select * from alumnos  where id = ?`;
        const [rows] = await connection.query(sql, [id]);

        const evaluation = `select * from evaluation  where id_alumno = ?`;
        const [results] = await connection.query(evaluation, [id]);
        // console.log(results)



        const periodo = `select * from periodo order by id desc limit 1  `;
        const [resultsPeriodo] = await connection.query(periodo, []);

        const data = {
            alumno: rows[0],
            evaluacion: results[0] ? results : [],
            next_periodo: resultsPeriodo ? resultsPeriodo : []
        }

        // console.log(results)

        if (rows.length > 0) {
            return NextResponse.json({ data: data });
        } else {
            return NextResponse.json({ data: [] });
        }

    } catch (error) {
        return NextResponse.json({ error: "error" });
    } finally {
        connection.release();
    }
}
