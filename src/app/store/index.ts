import { combineReducers} from 'redux';
import { UsersReducer } from './users.reducer';
import {  Users } from '../model/users';

export class IAppState {
  users: Users;
};
export const rootReducer = combineReducers<IAppState>({
  users: UsersReducer,
});
