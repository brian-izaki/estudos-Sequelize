// const { DataTypes } = require('sequelize/types');
const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

// FORMA COM VARIAVEL
/*
const Processos = sequelize.define(
  "Processos",
  {
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      defaultValue: "Descrição incompreensivel",
    },
  },
  {
    //outras opções
  }
);
*/

// FORMA DE CLASSE EXTENDIDA
class Processos extends Model {
  // pode ser criados métodos para a entidade Processos
}

Processos.init({
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    defaultValue: "Descrição incompreensivel",
  },
}, {
  // outras opções
  sequelize, // é obrigatório a instancia do banco
  modelName: 'Processos' // por padão o nome é o msm da classe
})

module.exports = Processos;
