import { IUserModel } from "../core/userModel";
import * as bcrypt from "bcrypt";

export interface IUserRequest extends IUserModel {
	uid : number;
	name : string;
	pass : string;

	generateHashPassword(password);
}

export class UserRequest implements IUserRequest {
	uid : number;
	name : string;
    pass : string;

	public generateHashPassword = function(password){
		this.pass =  bcrypt.hashSync(password,bcrypt.genSaltSync(8));
	}
}

