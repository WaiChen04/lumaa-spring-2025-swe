const User = require('./user')
const Task = require('./task')


User.hasMany(Task)
Task.belongsTo(User)

User.sync({ alter: true })
Task.sync({ alter: true })
console.log('Models synced')

module.exports = {
  Task, User
}