import {DataTypes} from "sequelize";
import db from '../config/db.js';

export const users = db.define("users",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    fullName:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{isEmail:true}
    },
    role:{
        type:DataTypes.ENUM('admin','user'),
        defaultValue:"user"
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    tableName:"users",
    timestamps:true
});
