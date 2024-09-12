import { cookies } from 'next/headers';
import pool from './src/app/libs/connection';
import { NextResponse } from 'next/server'



export const middleware = async (request) => {

    const cookie = cookies();
    const hash = cookie.get('user');

    // Verificar si la cookie 'user' está definida
    if (!hash || !hash.value) {
        console.error('No user cookie found');
        return NextResponse.redirect('/');
    }

    // Obtener la conexión a la base de datos
    const connection = await pool.getConnection();
    try {
        const sql = "SELECT t1.url FROM admin_navigation t0 LEFT JOIN admin_page t1 ON t0.idPage = t1.id WHERE `idUser` = ?";
        const [rows] = await connection.query(sql, [hash.value]);
        return rows

    } catch (error) {
        console.error('Database query error:', error);
        return NextResponse.error();
    } finally {
        connection.release();
    }
};
