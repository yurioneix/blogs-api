'use strict';

module.exports = {
  /**
   * 
   * @param {import('sequelize').QueryInterface} queryInterface 
   * @param {import('sequelize').Sequelize} Sequelize 
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('blog_posts', 
    { 
      id: {
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false, 
        type: Sequelize.STRING
      },
      content: {
        allowNull: false, 
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      published: {
        allowNull: false, 
        type: Sequelize.DATE, 
        defaultValue: Sequelize.fn('now'),
      },
      updated: {
        allowNull: false, 
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    },
  );
},

  down: async (queryInterface, _Sequelize) => {
    queryInterface.dropTable('blog_posts');
  }
};
