const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "recipe",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      summary: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      healthScore: {
        type: DataTypes.FLOAT
      },
      instructions: {
        type: DataTypes.ARRAY(DataTypes.STRING)
      },
      image: {
        type: DataTypes.TEXT,
        defaultValue: 'https://img.freepik.com/foto-gratis/vista-superior-marco-comida-deliciosa_23-2148708201.jpg?w=1380&t=st=1666560093~exp=1666560693~hmac=822cf89eb21ba25a21902e66fa2b6ea8f627e705c60392bd1ab787731bbdcb81'
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
};
