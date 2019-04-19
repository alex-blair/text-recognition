// Flux Standard Actions definitions according to:  https://github.com/acdlite/flux-standard-action
import { Action } from 'redux';

export interface StandardAction<T> extends Action {
  type: T;
}

export interface PayloadAction<T, P> extends StandardAction<T> {
  payload: P;
}

export interface ErrorAction<T, E> extends StandardAction<T> {
  error: E;
}
