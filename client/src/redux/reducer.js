import * as actions from './actions'

const initialState = {
    recipes: [],
    recipesCopy: [],
    recipeDetails: {},
    resetRecipes: false,
    page: 0,
    update: {}
}

function rootReducer(state = initialState , action){
    switch (action.type){
        case actions.GET_ALL_RECIPES:
            return({...state, recipes: [...action.payload].splice(0, 10) , recipesCopy: action.payload})
        case actions.SHOWPAGE:
            return({...state, recipes: [...state.recipesCopy].splice(action.payload * 10, 10), page: action.payload})
        case actions.GET_RECIPE_BY_NAME:
            return ({...state, recipesByName: action.payload})
        case actions.GET_RECIPE_DETAILS:
            initialState.recipeDetails = {}
            return ({...state, recipeDetails: action.payload})
        case actions.RESET_DETAILS:
            return({...state, recipeDetails: {}})
        case actions.UPDATE:
            return ({...state, update: action.payload})
        case actions.RESET_RECIPES:
            return({...state, recipes: [], resetRecipes: action.payload})
        case actions.ORDER:
            // state.recipes = [...state.recipesCopy].splice(state.page * 10, 10)
            if(action.payload === 'ascendente'){
                return({...state,  recipes: state.recipes.sort(((a, b) => a.title.localeCompare(b.title)))})
            }else if(action.payload === 'desendente'){
                return({...state,recipes: state.recipes.sort(((a, b) => b.title.localeCompare(a.title)))})
            }else{
                return({...state, recipes: [...state.recipesCopy].splice(state.page * 10, 10)})
            }
        case actions.ORDER_BY_DIET:
            state.recipes = [...state.recipesCopy].splice(state.page * 10, 10)
            if(action.payload ==='All'){
                return({...state, recipes: [...state.recipesCopy].splice(state.page * 10, 10)})
            }else{
                let byDiet = state.recipes.filter(d => d.diets.includes(action.payload))
                return({...state, recipes: byDiet.length > 0 ? byDiet : {message: `No hay recestas con la dieta ${action.payload}`}})
            }
            
        default: return state
    }
}

export default rootReducer;