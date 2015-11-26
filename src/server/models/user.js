module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    hash: DataTypes.STRING
  }, {
    timestamps: false,
    instanceMethods: {
      toJSON: function() {
        let values = this.get()

        delete values.hash
        
        return values
      }
    }
  })

  return User
}
