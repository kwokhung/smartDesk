import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { UserHelper } from '../../providers/user-helper/user-helper';

export class User {

  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }

}

@Injectable()
export class AuthService {

  currentUser: User;

  constructor(public userHelper: UserHelper) {
  }

  public login(credentials) {
    if (credentials.name === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        this.userHelper.validateUser(credentials.name, credentials.password).then((data: any) => {
          if (data.status === "true") {
            this.currentUser = new User('dummy', 'dummy@masonhk.com');
            observer.next(data.content.isValid);
            observer.complete();
          }
          else {
            observer.error(JSON.stringify(data.content.detailMessage));
          }
        }, (data: any) => {
          observer.error(JSON.stringify(data));
        });
      });
    }
  }

  public register(credentials) {
    if (credentials.name === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        this.userHelper.validateUser(credentials.name, credentials.password).then((data: any) => {
          if (data.status === "true") {
            this.currentUser = new User('dummy', 'dummy@masonhk.com');
            observer.next(true);
            observer.complete();
          }
          else {
            observer.error(JSON.stringify(data.content.detailMessage));
          }
        }, (data: any) => {
          observer.error(JSON.stringify(data));
        });
      });
    }
  }

  public getUserInfo(): User {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

}