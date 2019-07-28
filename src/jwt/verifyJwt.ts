import jwt from "jsonwebtoken";
import { SECRET } from "../env";
import User from "../models/user";

const user = new User();

export default function  verifyJwt(token: any ) {
    if (!token) {
        return false;
    }   try {
                const decoded: any = jwt.verify(token, SECRET);
                return user.findUserById(decoded.data);
        }
        catch (error) {
            return false;
        }
}