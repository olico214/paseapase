import mysql from "mysql2/promise";
const host = process.env.HOST
const user = process.env.USER
const database = process.env.DATABASE
const password = process.env.PASSWORD
console.log(host, user, database, password)
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
