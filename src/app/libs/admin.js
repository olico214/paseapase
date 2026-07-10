'use server'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import pool from "./connection";

/**
 * 
 * 
 * return user object 
 */
export const userFecth = async () => {

    const connection = await pool.getConnection();

    try {
        const sql =
            "Select fullname,email ,idUser,rol,phone from users";

        const [rows, fields] = await connection.query(sql, []);

        if (rows.length > 0) {
            return rows
        } else {
            return []
        }
    } catch {
        return false
    } finally {
        connection.release();
    }
}

/**
 * 
 * @returns 
 */
export async function getallPages() {
    try {
        const cookie = cookies()
        const session = cookie.get('user')
        const connection = await pool.getConnection();
        const sql =
            "select t1.* from admin_navigation t0 LEFT join admin_page t1 on t1.id = t0.idPage WHERE idUser = ?";

        const [rows, fields] = await connection.query(sql, [session.value]);

        if (rows.length > 0) {
            return rows
        } else {
            return []
        }

    } catch {
    }

}


export async function getNavigation() {
    try {
        const cookie = cookies()
        const session = cookie.get('user')
        if (!session) return []

        const connection = await pool.getConnection()
        const sql = "SELECT t1.url FROM admin_navigation t0 LEFT JOIN admin_page t1 ON t0.idPage = t1.id WHERE idUser = ?"
        const [rows] = await connection.query(sql, [session.value])
        connection.release()
        return rows
    } catch {
        return []
    }
}

export const redirectSistema = () => {
    return redirect('/sistema')
}
