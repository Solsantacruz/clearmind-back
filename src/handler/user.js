const { Router } = require("express");
const {
  getAllUsers,
  getUserById,
  createUser,
  getByEmail
} = require("../controllers/user");

const router = Router();

// Crear un nuevo usuario
router.post('/', async(req, res) => {
    const {name, lastname, email, password } = req.body;
    console.log(req.body);
    try {
        const response = await createUser(name, lastname, email, password);
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

})

router.post('/email', async (req, res) => {
  const {email, password} = req.body;
  try{
    const response = await getByEmail(email, password);
    res.status(200).json(response)
  }catch (error){
    res.status(500).json({ message: error.message });
  }
})

// Obtener un usuario por su ID
router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const user = await getUserById(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Obtener todos los usuarios
router.get("/", async (req, res) => {
    try {
      const users = await getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });



module.exports = router;