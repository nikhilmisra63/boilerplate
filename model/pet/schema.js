const Sequelize = require("sequelize");

const pet = {
  name: { type: Sequelize.STRING, required: true },
  color: { type: Sequelize.STRING },
  customerId: {
    type: Sequelize.BIGINT,
    allowNull: false
  }
};
const petSchema = sequelize.define("pet", pet, {
  freezeTableName: true
});

module.exports = petSchema;

const customerSchema = require("../customer/schema");
petSchema.belongsTo(customerSchema, {
  foreignKey: "customerId",
  as: "customer"
});
