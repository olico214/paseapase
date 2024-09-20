import pool from "./connection";
import crypto from 'crypto'
const generateRandomPassword = () => {
    return crypto.randomBytes(5).toString('base64').slice(0, 10);
};

const isPasswordUnique = async (password) => {
    const connection = await pool.getConnection();
    try {
        const sql = `SELECT COUNT(*) as count FROM alumnos WHERE password = ?`;
        const [rows] = await connection.query(sql, [password]);

        return rows[0].count === 0;
    } catch (error) {
        throw new Error("Database query error");
    } finally {
        connection.release();
    }
};

export const generatePassword = async (id) => {
    const connection = await pool.getConnection();
    // console.log(id)
    try {
        let password;
        let isUnique = false;

        while (!isUnique) {
            password = generateRandomPassword();
            // console.log(password)
            isUnique = await isPasswordUnique(password);
        }

        const sql = `UPDATE alumnos SET password=? WHERE id=?`;
        await connection.query(sql, [password, id]);

        return { ok: true, password }; // Retorna la contraseña generada para su referencia
    } catch (error) {
        return { error: "Error generating or updating password" };
    } finally {
        connection.release();
    }
};