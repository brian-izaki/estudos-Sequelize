"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Clientes",
      [
        {
          nome: "Rosalinda",
          sexo: "M",
          createdAt: new Date().toLocaleString("ja-JP"), // esse formato é de YYYY/MM/DD hh:mm:ss
          updatedAt: new Date().toLocaleString("ja-JP")
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Clientes", null, {});
  },
};
