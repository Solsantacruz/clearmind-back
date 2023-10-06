require("dotenv").config();
require("pg");
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
//Para trabajo local
// const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_BASE } = process.env;
//para deploy
const { DB_DEPLOY } = process.env;
const UserModels = require("./models/User");
const TodoModels = require("./models/Todo");
// const SharetodoModels = require("./models/Sharetodo");



//Para conexion local
// const sequelize = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_BASE}`,
//   { logging: false, native: false }
// );

//conexion deploy
const sequelize = new Sequelize(
    DB_DEPLOY,
    { logging: false,
      native: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // Solo para desarrollo local. En producción, configúralo correctamente.
        },
      },
    }
  );


UserModels(sequelize);
TodoModels(sequelize);
// SharetodoModels(sequelize);

const { User, Todo} = sequelize.models;


// Se define las relaciones
User.belongsToMany(Todo, { through: 'sharetodo'  });
Todo.belongsToMany(User, { through: 'sharetodo' });

// Opcionalmente, puedes definir las relaciones inversas
// Sharetodo.belongsTo(User, { foreignKey: "id" });
// Sharetodo.belongsTo(Todo, { foreignKey: "id" });





  //exportamos los modelos 
module.exports = {
    User,
    Todo,
    conn: sequelize,
  };