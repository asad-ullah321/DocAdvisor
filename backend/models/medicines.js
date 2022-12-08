const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../configs/db');

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });
 
 const medicines=sequelize.define("medicines",
 {
    MedicineName:{
         type: DataTypes.STRING,
         allowNULL:false,
         validate:{
         notEmpty:true
         }
     },
  
 });
 
 sequelize.sync().then(() => {
    console.log('Pateint table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

module.exports=medicines;
