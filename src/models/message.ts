import Koa from "koa";
import { query } from "../db/connect";

export default class Message  {
    userId: String;
    text: String;
    time: String;
    constructor(userId: any = "", text: String = "") {
        this.userId = userId;
        this.text = text;
    }
    async save() {
        const sql = `INSERT INTO chat (userId, text) VALUES (${this.userId}, '${this.text}')`;
        const result: any = await query(sql);
        return result;
    }
    async findById(id: String) {
        const sql = `SELECT * FROM chat WHERE id = (${id})`;
        const result: any = await query(sql);
        return result;
    }
    async changeById(newText: String, id: String) {
        const sql = `UPDATE chat SET text = '${newText}' WHERE id = ${id}`;
        const result: any = await query(sql);
        return result;
    }
    async deleteById(id: String) {
        const sql = `DELETE FROM chat WHERE id = ${id}`;
        const result: any = await query(sql);
        return result;
    }
    async selectHistory() {
        const sql = `SELECT text, userid FROM chat`;
        const result: any = await query(sql);
        return result;
    }
}