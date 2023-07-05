module.exports = (sequelize, DataTypes) => {
  const Homepage = sequelize.define('Homepage', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'notes',
    timestamps: false
  });

  return Homepage;
};
