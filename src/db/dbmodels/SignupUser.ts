
import { sequelize } from "./../dbmysql/db";
import * as ORM from "sequelize";

export const SignupUser = sequelize.define('users',{
	uid: {
		type: ORM.INTEGER,
		primaryKey: true
	},
	name: ORM.STRING,
	pass: ORM.STRING,
    mail: ORM.STRING
},{
	timestamps: false,
});
