const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {getRecipe, getRecipeById, createRecipe,getDiets} = require('../controllers/controllers.js')

const router = Router();

router.get('/recipes', getRecipe)
router.get('/recipes/:id', getRecipeById)
router.post('/recipes', createRecipe)
router.get('/diets', getDiets);
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
