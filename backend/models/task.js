const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

class Task extends Model {}

Task.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,  
  },
  description: {
    type: DataTypes.STRING, 
    allowNull: true
  },
  isComplete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'CASCADE'  
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'task'
});

module.exports = Task;
