
import { sequelize } from "./../dbmysql/db";
import * as ORM from "sequelize";

export const User = sequelize.define('users', {
	uid: {
		type: ORM.INTEGER(10).UNSIGNED,
		primaryKey: true,
		allowNull: false,
		defaultValue: 0
	},
	name: {
		type: ORM.STRING,
		allowNull: false,
		unique: true
	},
	pass: {
		type: ORM.STRING,
		allowNull: false
	},
	mail: {
		type: ORM.STRING,
		allowNull: true
	},
	theme: {
		type: ORM.STRING,
		allowNull: false
	},
	signature: {
		type: ORM.STRING,
		allowNull: false
	},
	signature_format: {
		type: ORM.STRING,
		allowNull: true
	},
	created: {
		type: ORM.INTEGER,
		allowNull: false
	},
	access: {
		type: ORM.INTEGER,
		allowNull: false
	},
	login: {
		type: ORM.INTEGER,
		allowNull: false
	},
	status: {
		type: ORM.INTEGER,
		allowNull: false
	},
	timezone: {
		type: ORM.STRING,
		allowNull: true
	},
	language: {
		type: ORM.STRING,
		allowNull: false
	},
	init: {
		type: ORM.STRING,
		allowNull: true
	},
	data: {
		type: ORM.BLOB,
		allowNull: true
	},
	fake_user_flag: {
		type: ORM.INTEGER(10).UNSIGNED,
		allowNull: false
	},
	uuid: {
		type: ORM.CHAR,
		allowNull: false
	},
	picture: {
		type: ORM.INTEGER,
		allowNull: false
	},
	fake_user_flag_1: {
		type: ORM.INTEGER(10).UNSIGNED,
		allowNull: false
	}
}, {
		timestamps: false,
	}
);
