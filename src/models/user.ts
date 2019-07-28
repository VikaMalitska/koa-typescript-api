import { query } from "../db/connect";
import bcrypt from "bcrypt";

export default class User {
    constructor() {

    }
    async addNewUser(login: String, pas: String) {
        pas = await bcrypt.hash(pas, 5);
        const sql = `INSERT INTO users (login, password) VALUES ('${login}', '${pas}')`;
        try {
            const result: any = await query(sql);
            return result;
        }
        catch (error) {
            return(error.sqlState);
        }
    }

    async findUserByLogin(login: String) {
        const sql = `SELECT * FROM users WHERE login = '${login}'`;
        const result: any = await query(sql);
        if (result.length === 0) {
            return false;
        }
        if (result[0].login !== login) {
            return false;
        } else return result;
    }

    async findUserById(id: String) {
        const sql = `SELECT * FROM users WHERE id = '${id}'`;
        const result: any = await query(sql);
        if (result.length === 0) {
            return false;
        }
        if (result[0].id !== id) {
            return false;
        } else return result[0].id;
    }
}