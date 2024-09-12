import pool from "@/app/libs/connection";
import { NextResponse } from "next/server";
import { getID } from "@/app/libs/cookie";

export async function POST(req) {
    try {
        const array = await req.json();
        const { id, selected } = array
        const data = selected

        const userData = await getID();

        if (!userData) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const { user_id } = userData;
        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            const query = `SELECT * FROM admin_navigation WHERE idUser = ?`;
            const [result] = await connection.query(query, [id]);

            const existingPages = result.map(item => ({
                idPage: item.idPage,
                keypage: item.keypage
            }));

            // Convert data array to keypage format
            const newKeyPages = data.map(pageId => id + pageId);



            // Insert new pages
            for (let pageId of data) {
                let keypage = id + pageId;
                if (!existingPages.some(item => item.keypage === keypage)) {
                    const sql = `INSERT INTO admin_navigation (idPage, idUser, keypage) VALUES (?, ?, ?)`;
                    await connection.query(sql, [pageId, id, keypage]);

                }
            }

            // Delete removed pages
            for (let { idPage, keypage } of existingPages) {
                if (!newKeyPages.includes(keypage)) {
                    const sql = `DELETE FROM admin_navigation WHERE idPage = ? AND idUser = ?`;
                    await connection.query(sql, [idPage, id]);

                }
            }

            await connection.commit();
            return NextResponse.json({ ok: true });
        } catch (error) {
            await connection.rollback();
            console.error(error);
            return NextResponse.json({ error: "An error occurred" }, { status: 500 });
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
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
