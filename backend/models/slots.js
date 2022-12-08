const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../configs/db");

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

const Slots = sequelize.define("Slots", {
  date: {
    type: DataTypes.STRING,
    allowNULL: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNULL: false,
    validate: {
      notEmpty: true,
    },
  },
  BookedBy: {
    type: DataTypes.STRING,
    allowNULL: false,
    validate: {
      notEmpty: true,
    },
  },
  slot: {
    type: DataTypes.STRING,
    allowNULL: false,
    validate: {
      notEmpty: true,
    },
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNULL: false,
    validate: {
      notEmpty: true,
    },
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNULL: false,
    validate: {
      notEmpty: true,
    },
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("Slots table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

module.exports = Slots;
