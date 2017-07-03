import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserHelper {

  users: Array<string>;

  constructor(public http: Http) {
    this.users = [];
  }

  getUsers() {
    return new Promise<Array<string>>(resolve => {
      this.http.get('http://localhost:5400/api/ADService/User/List', new RequestOptions({
        headers: new Headers({ 'Content-Type': 'application/json' })
      })).map(data => data.json()).subscribe(data => {
        this.users = data.content.userList;

        resolve(this.users);
      });
    });
  }

}
