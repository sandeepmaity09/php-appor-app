import * as bcrypt from "bcrypt";

export interface IUserModel {
	uid : number;
	name : string;
	pass : string;

	generateHashPassword(password);
    validPassword(password);
}

export class UserModel implements IUserModel {
	uid : number;
	name : string;
    pass : string;

	public generateHashPassword = function(password){
		this.pass =  bcrypt.hashSync(password,bcrypt.genSaltSync(8));
	}

    public validPassword = function (password) {
        return bcrypt.compareSync(password, this.pass);
    }
}

