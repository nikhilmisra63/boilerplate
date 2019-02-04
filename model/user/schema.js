const Sequelize = require("sequelize");

const user = {
  id: {
    type: Sequelize.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  username: { type: Sequelize.STRING, required: true },
  firstName: { type: Sequelize.STRING, required: true },
  lastName: { type: Sequelize.STRING, required: true },
  email: { type: Sequelize.STRING, required: true },
  age: { type: Sequelize.INTEGER },
  address: { type: Sequelize.STRING, require: true },
  phone_number: { type: Sequelize.STRING },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
};

const userSchema = sequelize.define("user", user, {
  freezeTableName: true
});

module.exports = userSchema;

const petSchema = require("../pet/schema");
userSchema.hasMany(petSchema, { as: "pets", sourceKey: "id" });
