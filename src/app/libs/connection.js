import mysql from "mysql2/promise";


let pool;
try {
    pool = mysql.createPool({
        host: '151.106.97.51',
        user: 'u835880732_sportsCRM',
        database: 'u835880732_sportsCRM',
        password: 'xP0*G4A@6',
    });
} catch (err) {
    console.error(err);
}

export default pool;
