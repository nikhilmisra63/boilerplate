const Sequelize = require('sequelize');
const config = require('config');
const schema = {
  accessToken: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  accessTokenExpiresAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  refreshToken: {
    type: Sequelize.STRING,
    allowNull: false
  },
  refreshTokenExpiresAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  memberId: {
    allowNull: false,
    type: Sequelize.BIGINT,
    require: true
  },
  deviceType: {
    type: Sequelize.ENUM,
    values: ['android', 'ios', 'web'],
    require: true
  },
  deviceToken: {
    type: Sequelize.STRING
  }
};

const tokenSchema = sequelize.define("AccessToken", schema, {
  freezeTableName: true
});

module.exports = tokenSchema;

const memberSchema = require('../customer/schema');


tokenSchema.belongsTo(memberSchema, {
  foreignKey: 'memberId',
  as: 'member',
  targetKey: 'id',
  onDelete: 'CASCADE',
  hooks: true
});
