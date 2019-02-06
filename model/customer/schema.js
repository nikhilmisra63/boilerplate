const Sequelize = require("sequelize");

const customer = {
  id: {
    type: Sequelize.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  customername: {
    type: Sequelize.STRING,
    required: true,
    validate: {
      len: {
        args: [5, 20],
        msg: "Min length of the customername is 5 and max 20"
      }
    }
  },
  firstName: { type: Sequelize.STRING, required: true },
  lastName: { type: Sequelize.STRING },
  email: {
    type: Sequelize.STRING,
    required: true,
    validate: { isEmail: true }
  },
  age: { type: Sequelize.INTEGER, validate: { isInt: true } },
  address: { type: Sequelize.STRING, require: true },
  phone_number: {
    type: Sequelize.BIGINT,
    validate: {
      not: {
        args: ["[a-z]", "i"],
        msg: "Please enter a valid number"
      },
      len: {
        args: [10, 20],
        msg: "Min length of the phone number is 10"
      }
    }
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
};

const customerSchema = sequelize.define("customer", customer, {
  freezeTableName: true
});

module.exports = customerSchema;

const petSchema = require("../pet/schema");
customerSchema.hasMany(petSchema, { as: "pets", sourceKey: "id" });
