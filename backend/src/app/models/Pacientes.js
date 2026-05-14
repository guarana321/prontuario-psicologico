'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pacientes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Sessoes, { foreignKey: 'paciente_id', as: 'sessoes' });
    }
  }
  Pacientes.init({
    Nome: DataTypes.STRING,
    Idade: DataTypes.INTEGER,
    email: DataTypes.STRING,
    telefone: DataTypes.STRING,
    data_nascimento: DataTypes.DATEONLY,
    observacoes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Pacientes',
  });
  return Pacientes;
};