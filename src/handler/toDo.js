const { Router } = require("express");
const {
  getTodo,
  getTodoById,
  createToDo,
  updateTodo,
  editTodo,
  deleteId,
} = require("../controllers/toDo");

const router = Router();

// Trae todos los toDo
router.get('/', async(req, res) => {
  try{
    const response = await getTodo();
    res.status(200).json(response)
  }catch (error){
    res.status(500).json({ message: error.message });
  }
})

// Crear un nuevo toDo
router.post('/', async(req, res) => {
    const {title, complete, UserId} = req.body;
    console.log(req.body);
    try {
        const response = await createToDo(title, complete, UserId);
        console.log(response)
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

})

// Obtener un toDo por su ID
router.get("/:id", async (req, res) => {
    try {
      const  id  = Number(req.params.id);
    
      console.log(req.params)
      const response = await getTodoById(id);
      res.status(200).json(response);
      // console.log(response)
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Eliminar un toDo
  router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
      try{
        const response = await deleteId(id)
        res.status(204).send('Borrado con exito')
      }catch (error){
        res.status(500).json({ message: error.message })
      }
  })


  // Editar un toDo
  // router.put('/update/:id', async (req, res) => {
  //   const { id } = req.params;
  //   const newData = req.body; // Espera que los nuevos datos a actualizar se envíen en el cuerpo de la solicitud
  
  //   try {
  //     const updatedActi = await updateTodo(id, newData);
  //     res.status(200).json(updatedActi);
  //   } catch (error) {
  //     console.log('error', error);
  //     res.status(400).send({ error: 'Update Fail' });
  //   }
  // });
//   router.put('/update/:id', async (req, res) => {
//   const { id } = req.params;
//   const { complete, ...newData } = req.body; // Espera que los nuevos datos a actualizar se envíen en el cuerpo de la solicitud, incluyendo "complete"
//   console.log("id", req.params)
//   console.log("complete", req.body)
//   try {
//     // Asegúrate de que "complete" se establezca en "true" si se envía desde el frontend
//     if (complete === true ) {
//       const updatedActi = await updateTodo(id, { ...newData, complete: true });
//       res.status(200).json(updatedActi);
//     } else {
//       const updatedActi = await updateTodo(id, newData);
//       res.status(200).json(updatedActi);
//     }
//   } catch (error) {
//     console.log('error', error);
//     res.status(400).send({ error: 'Update Fail' });
//   }
// });
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { complete, ...newData } = req.body;

  try {
    const updatedActi = await updateTodo(id, { ...newData, complete });
    res.status(200).json(updatedActi);
  } catch (error) {
    console.log('error', error);
    res.status(400).send({ error: 'Update Fail' });
  }
});

router.put('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { title, ...newData } = req.body;
  console.log(req.body);

  try {
    const updatedActi = await editTodo(id, { ...newData, title });
    res.status(200).json(updatedActi);
  } catch (error) {
    console.log('error', error);
    res.status(400).send({ error: 'Update Fail' });
  }
});


  


module.exports = router;