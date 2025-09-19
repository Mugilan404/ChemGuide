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
      type: DataTypes.STRING, // just store the filename
      allowNull: false,
    },
    file_path: {
      type: DataTypes.STRING, // store relative path to /uploads
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    timestamps: false,
    tableName: "materials"
  });

  return Material;
};
