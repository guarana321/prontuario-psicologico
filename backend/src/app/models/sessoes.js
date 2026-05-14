'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sessoes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Pacientes, { foreignKey: 'paciente_id', as: 'paciente' });
    }
  }
  Sessoes.init({
    data_sessao: DataTypes.DATE,
    anotacoes: DataTypes.TEXT,
    paciente_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Sessoes',
  });
  return Sessoes;
};