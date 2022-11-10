export const GET_ALL_RECIPES = "GET_ALL_FOODS";
export const GET_RECIPE_BY_NAME = "GET_RECIPE_BY_NAME";
export const GET_RECIPE_DETAILS = "GET_FOOD_DETAILS";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const RESET_DETAILS = "RESET_DETAILS";
export const RESET_RECIPES = "RESET_RECIPES";
export const GET_DIETS = "GET_DIETS";
export const UPDATE = "UPDATE";
export const ORDER_BY_DIET = "ORDER_BY_DIET";
export const SHOWPAGE = "SHOWPAGE";
export const ORDER = "ORDER";

export const getAllRecipe = (name) => {
  return function (dispatch) {
    return fetch(`http://localhost:3001/recipes?name=${name}`)
      .then((res) => res.json())
      .then((res) => dispatch({ type: GET_ALL_RECIPES, payload: res }));
  };
};
export const getRecipeByName = (name) => {
  return function (dispatch) {
    return fetch(`http://localhost:3001/recipes?name=${name}`)
      .then((res) => res.json())
      .then((res) => dispatch({ type: GET_RECIPE_BY_NAME, payload: res }));
  };
};
export const getRecipeDetails = (id) => {
  return function (dispatch) {
    return fetch(`http://localhost:3001/recipes/${id}`)
      .then((res) => res.json())
      .then((res) => dispatch({ type: GET_RECIPE_DETAILS, payload: res }));
  };
};

export const createRecipe = (res) => {
  console.log(res)
  return function () {
    return fetch("http://localhost:3001/recipes", {
      method: "POST",
      body: JSON.stringify(res),
      headers: { "Content-Type": "application/json" },
    });
  };
};
export const getDiets = () => {
  return function () {
    return fetch("http://localhost:3001/diets");
  };
};
export const resetRecipeDetails = () => {
  return { type: RESET_DETAILS };
};
export const resetRecipes = (reset) => {
  return { type: RESET_RECIPES, payload: reset };
};
export const update = (updateFilter, updateRecipes) => {
  return {
    type: UPDATE,
    payload: { filter: updateFilter, recipes: updateRecipes },
  };
};
export const order = (res) => {
  return { type: ORDER, payload: res };
};
export const orderByDiet = (diet) => {
  return{type: ORDER_BY_DIET, payload:diet}
}
export const showPage = (page) => {
  return { type: SHOWPAGE, payload: page };
};
