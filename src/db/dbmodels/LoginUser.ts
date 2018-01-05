
import { sequelize } from "./../dbmysql/db";
import * as ORM from "sequelize";

export const LoginUser = sequelize.define('users',{
	uid: {
		type: ORM.INTEGER,
		primaryKey: true
	},
	name: ORM.STRING,
	pass: ORM.STRING
},{
	timestamps: false,
});
