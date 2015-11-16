module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    hash: DataTypes.STRING
  }, {
    timestamps: false
  })

  return User
}
