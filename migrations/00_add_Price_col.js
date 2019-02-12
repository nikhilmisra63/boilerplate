module.exports = {
  up: async (queryInterface, Sequelize) => [
    await queryInterface.addColumn("pet", "price", {
      type: Sequelize.INTEGER,
      allowNull: false
    })
  ]
};
