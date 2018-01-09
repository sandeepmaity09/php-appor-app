
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
		allowNull: false                   // this is true in db but it should be false there as well
	},
	theme: {
		type: ORM.STRING,
		allowNull: true                  // true => only for test else => false 
	},
	signature: {
		type: ORM.STRING,
		allowNull: true                // true => only for test else => false
	},
	signature_format: {
		type: ORM.STRING,
		allowNull: true,
		defaultValue: true
	},
	created: {
		type: ORM.INTEGER,
		allowNull: false,
		defaultValue:0
	},
	access: {
		type: ORM.INTEGER,
		allowNull: false,
		defaultValue: 0
	},
	login: {
		type: ORM.INTEGER,
		allowNull: false,
		defaultValue: 0
	},
	status: {
		type: ORM.INTEGER,
		allowNull: false,
		defaultValue: 0
	},
	timezone: {
		type: ORM.STRING,
		allowNull: true,
		defaultValue: null
	},
	language: {
		type: ORM.STRING,
		allowNull: true                // true => only for test else => false
	},
	init: {
		type: ORM.STRING,
		allowNull: true,
		defaultValue: null
	},
	data: {
		type: ORM.BLOB,
		allowNull: true,
		defaultValue: null
	},
	fake_user_flag: {
		type: ORM.INTEGER(10).UNSIGNED,
		allowNull: false,
		defaultValue: 0
	},
	uuid: {
		type: ORM.CHAR,
		allowNull: true            // true => only for test else => false
	},
	picture: {
		type: ORM.INTEGER,
		allowNull: false,
		defaultValue: 0
	},
	fake_user_flag_1: {
		type: ORM.INTEGER(10).UNSIGNED,
		allowNull: false,
		defaultValue: 0
	}
}, {
		timestamps: false,
	}
);
