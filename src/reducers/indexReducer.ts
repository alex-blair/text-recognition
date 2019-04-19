import { combineReducers } from 'redux';
import { RecipeState, recipeState } from './RecipeReducer';

export interface AppState {
  recipeState: RecipeState;
}

export default combineReducers<AppState>({
  recipeState,
});
