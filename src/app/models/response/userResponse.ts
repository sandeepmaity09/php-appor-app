import { IUserModel } from '../core/userModel'
import * as bcrypt from 'bcrypt';

export interface IUserResponse extends IUserModel {
    uid: number;
    name: string;
    pass: string;
    validPassword(password);
}

export class UserResponse implements IUserResponse {

    uid: number;
    name: string;
    pass: string;

    constructor(uid, name, password) {
        this.uid = uid;
        this.name = name;
        this.pass = password;
    }

    public validPassword = function (password) {
        return bcrypt.compareSync(password, this.pass);
    }
}