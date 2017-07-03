import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserHelper {

  users: Array<string>;

  constructor(public http: Http) {
    this.users = [];
  }

  getLogs() {
    return Promise.resolve(this.users);
  }

}
