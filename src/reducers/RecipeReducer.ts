import { RecipeActions } from '../actions/RecipeActions';

export interface Recipe {
  title: string;
  recipe: string;
}

export interface RecipeState {
  recipes: Recipe[];
}

const initialState: RecipeState = {
  recipes: [],
};

export function recipeState(state: RecipeState = initialState, action: RecipeActions): RecipeState {
  switch (action.type) {
    case 'SAVE_RECIPE':
      return {
        ...state,
        recipes: [...state.recipes, action.payload.recipe],
      };
    default:
      return state;
  }
}
