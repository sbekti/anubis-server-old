module.exports = function(sequelize, DataTypes) {
  const Device = sequelize.define('Device', {
    name: DataTypes.STRING,
    state: DataTypes.INTEGER
  }, {
    timestamps: false
  })

  return Device
}
