const {Todo, User} = require('../db');

//Trae todo los toDo
const getTodo = async () => {
    const todoDb = await Todo.findAll({
        include:{
            model: User,
            through: {
              attributes: [],
            }
          }
    });
    return todoDb;
 };

 // busqueda de toDo por ID.
const getTodoById = async (id) => {
    const idAct = Number(id);
    const actiBd = await Todo.findByPk(idAct, {
        include:{
            model: User,
            attributes: ['id'],
            through: {
              attributes: [],
            }
          }
    });
    return actiBd;
};

// Crear toDo

const createToDo = async (title, complete, UserId) => {
    const newTodo = await Todo.create({title, complete, UserId})

    let titleDb = await User.findAll({
        where: {id: UserId }
      })


    newTodo.addUser(titleDb);
    return newTodo;
}

//Elimina un toDO
const deleteId = async (id) => {
     await Todo.destroy({where: {id:id}})
     const deleteId = Todo.findAll();
    return deleteId;
}

//funcion para editar toDo
const updateTodo = async (id, newData) => {
    // modifica los datos en la base de datos
    await Todo.update(newData, {
      where: { id: id },
    });
    
    // Después de la actualización, obtén los datos actualizados
    const updatedTodo = await Todo.findByPk(id);
    return updatedTodo;
  };

  const editTodo = async (id, newData) => {
    // modifica los datos en la base de datos
    await Todo.update(newData, {
      where: { id: id },
    });
    
    // Después de la actualización, obtén los datos actualizados
    const updatedTodo = await Todo.findByPk(id);
    return updatedTodo;
  };



module.exports = {
    getTodo,
    getTodoById,
    createToDo,
    deleteId,
    updateTodo,
    editTodo
};