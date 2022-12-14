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

const Doctor = sequelize.define("Doctor", {
  name: {
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

  city: {
    type: DataTypes.STRING,
    allowNULL: false,
    validate: {
      notEmpty: true,
    },
  },

  qualification: {
    type: DataTypes.STRING,
    allowNULL: false,
    validate: {
      notEmpty: true,
    },
  },

  specialization: {
    type: DataTypes.STRING,
    allowNULL: false,
    validate: {
      notEmpty: true,
    },
  },

  experience: {
    type: DataTypes.STRING,
    allowNULL: false,
    validate: {
      notEmpty: true,
    },
  },

  fee: {
    type: DataTypes.STRING,
    allowNULL: false,
    validate: {
      notEmpty: true,
    },
  },

  phoneNumber: {
    type: DataTypes.STRING,
    allowNULL: false,
    validate: {
      notEmpty: true,
    },
  },

  password: {
    type: DataTypes.STRING,
    allowNULL: false,
    validate: {
      notEmpty: true,
    },
  },

  filename: {
    type: DataTypes.STRING,
    allowNULL: false,
    validate: {
      notEmpty: true,
    },
  },



});

sequelize
  .sync()
  .then(() => {
    console.log("Doctor table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

module.exports = Doctor;
