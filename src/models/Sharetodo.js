const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Sharetodo",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      idUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User", // Nombre de la tabla de usuarios
          key: "id",     // Clave primaria de la tabla de usuarios
        },
      },
      idTodo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Todo", // Nombre de la tabla de tareas
          key: "id",     // Clave primaria de la tabla de tareas
        },
    },
},
    { timestamps: false }
  );
};