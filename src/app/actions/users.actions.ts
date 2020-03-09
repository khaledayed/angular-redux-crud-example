import {Injectable} from '@angular/core';
import {IAppState} from '../store/index';
import {NgRedux} from '@angular-redux/store';
import {User} from '../model/users';
import { Http} from '@angular/http';
@Injectable()
export class UsersActions {
  static USERS_GET = 'USERS_GET';
  static USERS_ADD = 'USERS_ADD';
  static USERS_UPDATE = 'USERS_UPDATE';
  static USERS_DELETE = 'USERS_DELETE';
  static USERS_GET_ACTIVE = 'USERS_GET_ACTIVE';
  static USERS_SET_ACTIVE = 'USERS_SET_ACTIVE';
  static USERS_RESET_ACTIVE = 'USERS_RESET_ACTIVE';
  API_URL = 'https://jsonplaceholder.typicode.com';

constructor( private ngRedux: NgRedux<IAppState>,
  private http: Http,){

}
getUsers(){
  this.http.get(`${this.API_URL}/users`).subscribe((res)=>
  {
    const list = res.json();
this.ngRedux.dispatch({
  type: UsersActions.USERS_GET,
  payload: {
    list
  }
});
this.setActiveUser(list[0].id);
  });
}
save(user: User) {
  if (user.id) {
    this.update(user);
  } else {
    this.add(user);
  }
}

add(user: User): void {
  this.http.post(`${this.API_URL}/users/`, user)
    .subscribe((res) => {
      // add new user
      this.ngRedux.dispatch({
        type: UsersActions.USERS_ADD,
        payload: { user: res.json() }
      });

      // select last added user
      this.setActiveUser(res.json().id);
    });
}

update(user: User) {
  this.http.patch(`${this.API_URL}/users/${user.id}`, user)
    .subscribe((res) => {
      // update user
      this.ngRedux.dispatch({
        type: UsersActions.USERS_UPDATE,
        payload: { user: res.json() }
      });

      // update active user
      this.setActiveUser(user.id);
    });
}

deleteUser(id): void {
  this.http.delete(`${this.API_URL}/users/${id}`)
    .subscribe((res) => {
      this.ngRedux.dispatch({
        type: UsersActions.USERS_DELETE,
        payload: { id }
      });
      this.resetActive();
    });
}

setActiveUser(id: number): void {
  this.ngRedux.dispatch({
    type: UsersActions.USERS_SET_ACTIVE,
    payload: { id }
  });
}

resetActive(): void {
  this.ngRedux.dispatch({
    type: UsersActions.USERS_RESET_ACTIVE,
    payload: null
  });
}
}
