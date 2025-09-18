module.exports = (sequelize, DataTypes) => {
  const Material = sequelize.define('Material', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    file_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    file_data: {
      type: DataTypes.BLOB('long'),
      allowNull: false,
    },
  });

  return Material;
};
