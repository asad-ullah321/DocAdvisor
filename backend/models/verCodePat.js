const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../configs/db');

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });
 
 const verifcationCodePat=sequelize.define("verifcationCodePat",
    {
        Code:{
            type: DataTypes.INTEGER,
            allowNULL:false,
            validate:{
            notEmpty:true
            }
        },

        email:{
            type: DataTypes.STRING,
            allowNULL:false,
            validate:{
            notEmpty:true
            }
        },

        status:{
            type: DataTypes.BOOLEAN,
            allowNULL:false,
            validate:{
            notEmpty:true
            }
        },
    });
 
 sequelize.sync().then(() => {
    console.log('VerCode table for Pateint created successfully!');
 }).catch((error) => {
    console.error('Unable to create table vercode table: ', error);
 });

module.exports=verifcationCodePat;
