import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
//import 'rxjs/add/operator/map';
//import 'rxjs/Rx';

@Injectable()
export class UserHelper {

  users: Array<string>;

  constructor(public http: Http) {
    this.users = [];
  }

  getUsers() {
    /*return this.http.get('http://localhost:5400/api/ADService/User/List', new RequestOptions({
      headers: new Headers({ 'Content-Type': 'application/json' })
    })).map(data => data.json().content.userList).toPromise();*/
    return new Promise<Array<string>>(resolve => {
      this.http.get('http://localhost:5400/api/ADService/User/List', new RequestOptions({
        headers: new Headers({ 'Content-Type': 'application/json' })
      })).subscribe(data => {
        resolve(data.json().content.userList);
      });
    });
  }

}
