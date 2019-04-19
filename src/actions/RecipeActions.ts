import { PayloadAction } from './Actions';
import { Recipe } from '../reducers/RecipeReducer';

export type RecipeActions =
  | PayloadAction<'SAVE_RECIPE', { recipe: Recipe }>;

export function saveRecipe(recipe: Recipe): RecipeActions {
  return { type: 'SAVE_RECIPE', payload: { recipe } };
}
