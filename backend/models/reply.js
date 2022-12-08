const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../configs/db');

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });
 
 const Reply=sequelize.define("Reply",
    {
        Date:{
            type: DataTypes.STRING,
            allowNULL:false,
            validate:{
            notEmpty:true
            }
        },

        Commentid:{
            type: DataTypes.INTEGER,
            allowNULL:false,
            validate:{
            notEmpty:true
            }
        },
        ReplyBy:{
            type: DataTypes.STRING,
            allowNULL:false,
            validate:{
            notEmpty:true
            }
        },
        Reply:{
            type: DataTypes.STRING,
            allowNULL:false,
            validate:{
            notEmpty:true
            }
        },

    });
 
 sequelize.sync().then(() => {
    console.log('Reply table created successfully!');
 }).catch((error) => {
    console.error('Unable to create Reply table: ', error);
 });

module.exports = Reply;
