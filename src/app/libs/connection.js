import mysql from "mysql2/promise";
const host = process.env.DB_HOST
const user = process.env.DB_USER
const database = process.env.DB_NAME
const password = process.env.DB_PASSWORD
let pool;
try {
    pool = mysql.createPool({
        host: host,
        user: user,
        database: database,
        password: password,
    });
} catch (err) {
    console.error(err);
}

export default pool;
