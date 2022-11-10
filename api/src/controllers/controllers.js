require("dotenv").config();
const axios = require("axios");
const { Op } = require("sequelize");
const { API_KEY } = process.env;
const { Recipe, Diet } = require("../db");
const arrDiets = require('../utils/AllDiets')

const getRecipe = async (req, res) => {
  const { name } = req.query;
  try {
    if(!name || name == 'undefined'){

      let recipesDb = await Recipe.findAll({include: Diet});

      recipesDb = recipesDb.map(r => r = {id: r.id, title: r.title, image: r.image, diets: r.diets.map(d => d = d.name) })

      let response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=${API_KEY}&addRecipeInformation=true`);

      response = response.data.results.map(r => r = {id: r.id, title: r.title, image: r.image, diets: r.diets })
      
      let allRecipes = recipesDb.concat(response)
      return res.json(allRecipes);
    }
    let recipeDb = await Recipe.findAll({where: {title: {[Op.iLike]:`${name}%`}}, include: Diet})
    recipeDb = recipeDb.map(r => r = {id: r.id, title: r.title, image: r.image, diets: r.diets.map(d => d = d.name) })
    let recipe = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${name}&number=100&apiKey=${API_KEY}&addRecipeInformation=true`
    );
    
    recipe = recipe.data.results.map(r => r = {id: r.id, title: r.title, image: r.image, diets: r.diets });
    if (recipe.length == 0)
      throw new Error(`No hay un platillo con la palabra clave ${name}`);
    res.json(recipeDb.concat(recipe));
  } catch (e) {
    console.log(e.message);
    res.status(404).json({ message: e.message });
  }
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  try {
    try {
      let recipe = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
      );
      let steps = [];
      const {
        title,
        summary,
        healthScore,
        analyzedInstructions,
        image,
        diets,
      } = recipe.data;

      if (analyzedInstructions.length == 0) {
        steps = ["Sin pasos disponibles"];
      } else {
        steps = await analyzedInstructions[0].steps.map((s) => {
          return (s = s.step);
        });
      }

      let food = {
        id,
        title,
        summary: summary.replace(/<[^>]*>?/g, ""),
        healthScore,
        instructions: steps,
        diets,
        image,
      };
      res.json(food);
    } catch (error) {
      let recipeDb = await Recipe.findOne(
        {
          where: { id },
          include: Diet,
        }
      );
      
      return res.json(recipeDb);
    }
  } catch (error) {
    res.status(404).json({ message: `La receta con el id ${id} no se encuentra`});
  }
};

const createRecipe = async (req, res) => {
  try {
    const { title, summary, healthScore, instructions, image, diet } = req.body;
    if (await Recipe.findOne({ where: { title } }))
      throw new Error(`la receta con el nombre ${title} ya fue creada`);
    let recipeCreate = await Recipe.create(
      {
        title,
        summary,
        healthScore,
        instructions,
        image,
      },
      { include: { model: Diet } }
    );

    let objs = [];
    for (let i = 0; i < diet.length; i++) {
      let alldiets = await Diet.findOne({ where: { name: diet[i] } });
      objs.push(alldiets);
    }
    await recipeCreate.addDiets(objs);
    recipeCreate = await Recipe.findOne({
      where: { title },
      include: Diet,
    });
    res.status(201).json(recipeCreate);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const getDiets = async (req, res) => {

  try {
    for (let i = 0; i < arrDiets.length; i++) {
      await Diet.findOrCreate({
        where: { name: arrDiets[i] },
        defaults: {
          name: arrDiets[i],
        },
      });
    }
    res.status(201).json({message: 'Dietas Cargadas'});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getRecipe,
  getRecipeById,
  createRecipe,
  getDiets,
};
