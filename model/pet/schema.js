const Sequelize = require("sequelize");

const pet = {
  name: { type: Sequelize.STRING, required: true },
  color: { type: Sequelize.STRING },
  userId: {
    type: Sequelize.BIGINT,
    allowNull: false
  }
};
const petSchema = sequelize.define("pet", pet, {
  freezeTableName: true
});

module.exports = petSchema;

const userSchema = require("../user/schema");
petSchema.belongsTo(userSchema, { foreignKey: "userId", as: "member" });
