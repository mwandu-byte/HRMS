'use strict';

const { link } = require('../routes/menuRoutes');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Menus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      icon: {
        type: Sequelize.STRING,
        allowNull: true, // Inaruhusu kuwa na icon au isiwepo
      },
      link: {
        type: Sequelize.STRING,
        allowNull: false, // Hii ndiyo itakuwa link ya menu
      },
      parentId: {
        type: Sequelize.INTEGER,
        allowNull: true, // Ikiwa menu hii ni submenu, itakuwa na parentId
        references: {
          model: 'Menus',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Menus');
  }
};
