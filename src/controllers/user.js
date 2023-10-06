const { User, Todo} = require('../db')


// Controller Nuevo Usuario 
const createUser = async (name, lastname, email, password) => {
    
    //   const {name, lastName, email, password } = req.body;
      /* console.log({ profile, name, lastName, email, password }); */
  
      const newUser = await User.create({
        name,
        lastname,
        email,
        password,
      });
      return newUser;
    }

    // Controller llamado a todos los Usuarios
const getAllUsers = async () => {
    const users = await User.findAll({
      include:{
        model: Todo,
        through: {
          attributes: [],
        }
      }
    });
    return users;
  };

  // Controller llamdo a usuario por Id
const getUserById = async (id) => {
    const user = await User.findByPk(id, {
      include:{
        model: Todo,
        through: {
          attributes: [],
        }
      }
    });
    return user;
  };


const getByEmail = async (email, password) => {
  const user = await User.findOne({
    where: { email: email, password: password },
  });

  if (user) {
    return user;
  } else {
    throw new Error('Usuario no encontrado o contraseña incorrecta');
  }
}

module.exports = {
    createUser,
     getAllUsers,
     getUserById,
     getByEmail,
}
