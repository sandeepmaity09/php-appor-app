
import { sequelize } from "./../dbmysql/db";
import * as ORM from "sequelize";

export const User = sequelize.define('users',{
	uid: {
		type: ORM.INTEGER,
		primaryKey: true
	},
	name: ORM.STRING,
	pass: ORM.STRING,
	mail: ORM.STRING,
	theme: ORM.STRING,
	signature: ORM.STRING,
	signature_format: ORM.STRING
},{
	timestamps: false,
});
