const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../configs/db');

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });
 
 const Comment=sequelize.define("Comment",
    {
        Date:{
            type: DataTypes.STRING,
            allowNULL:false,
            validate:{
            notEmpty:true
            }
        },

        Doctorid:{
            type: DataTypes.STRING,
            allowNULL:false,
            validate:{
            notEmpty:true
            }
        },
        Patientid:{
            type: DataTypes.STRING,
            allowNULL:false,
            validate:{
            notEmpty:true
            }
        },
        Comment:{
            type: DataTypes.STRING,
            allowNULL:false,
            validate:{
            notEmpty:true
            }
        },

    });
 
 sequelize.sync().then(() => {
    console.log('Comment table created successfully!');
 }).catch((error) => {
    console.error('Unable to create Comment table: ', error);
 });

module.exports = Comment;
