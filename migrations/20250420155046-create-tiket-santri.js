'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TiketSantris', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      SantriId: {
        type: Sequelize.STRING,
        allowNull: false,
        // references: {
        //   model: 'Users',
        //   key: 'id'
        // },
        // onDelete: 'CASCADE',
        // onUpdate: 'CASCADE'
      },
      TiketId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Tikets',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TiketSantris');
  }
};