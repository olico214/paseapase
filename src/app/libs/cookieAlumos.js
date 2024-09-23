'use server'

import { cookies } from 'next/headers'
import pool from './connection'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'




export async function setcookieAlumnos(user) {
    cookies().set('user', user)
}


export async function getNameSessionAlumno() {
    try {
        const cookie = cookies()
        const galleta = cookie.get('user')
        return galleta.value
        // const validation = await validateuser(galleta.value)
        // if (validation) {
        //     return validation
        // } else {
        //     return false
        // }
    } catch {
    }

}






export async function deleteCookie() {
    cookies().delete('user')
    return redirect('/')
}




const validateuser = async (hash) => {
    const connection = await pool.getConnection();

    try {
        const sql =
            "Select * from alumnos where id = ?";

        const [rows, fields] = await connection.query(sql, [hash]);

        if (rows.length > 0) {
            return rows[0]
        } else {
            return false
        }
    } catch {
        return false
    } finally {
        connection.release();
    }
}


export const getID = async () => {
    const cookie = cookies()
    const hash = cookie.get('user')

    const connection = await pool.getConnection();

    try {
        const sql =
            "Select *  from related_User_company where `user_id` = ?";

        const [rows, fields] = await connection.query(sql, [hash.value]);

        if (rows.length > 0) {
            return rows[0]
        } else {
            return false
        }
    } catch {
        return false
    } finally {
        connection.release();
    }
}



export const redirectLoginPadre = (id) => {
    return redirect('/alumnos/' + id)
}