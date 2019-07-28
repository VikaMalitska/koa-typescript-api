import mysql from "mysql";

const connection = mysql.createConnection({
    host     : "localhost",
    user     : "root",
    password : "qwert12354",
    database : "myapp"
});

connection.connect();

export function query(sql: string) {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
}

