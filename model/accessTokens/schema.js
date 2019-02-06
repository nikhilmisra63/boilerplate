const Sequelize = require("sequelize");

const accessToken = {
  id: {
    type: Sequelize.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  token: { type: Sequelize.STRING, allowNull: false },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  userId: {
    type: Sequelize.BIGINT,
    allowNull: false
  }
};

const accessTokenSchema = sequelize.define("accessTokens", accessToken, {
  freezeTableName: true
});

module.exports = accessTokenSchema;
const userSchema = require("../user/schema");
accessTokenSchema.belongsTo(userSchema, { foreignKey: "userId", as: "member" });
