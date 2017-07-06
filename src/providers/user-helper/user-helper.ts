import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class UserHelper {

  constructor(public http: Http) {
  }

  getUsers() {
    return new Promise<Array<string>>(resolve => {
      this.http.get('http://localhost:5400/api/ADService/User/List', new RequestOptions({
        headers: new Headers({
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        })
      })).subscribe(data => {
        resolve(data.json());
      });
    });
  }

  getUser(samAccountName: string) {
    return new Promise<Array<string>>(resolve => {
      this.http.post('http://localhost:5400/api/ADService/User/Get', {
        txtSamAccountName: samAccountName
      }, new RequestOptions({
        headers: new Headers({
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        })
      })).subscribe(data => {
        resolve(data.json());
      });
    });
  }

  deleteUser(samAccountName: string) {
    return new Promise<Array<string>>(resolve => {
      this.http.post('http://localhost:5400/api/ADService/User/Delete', {
        txtSamAccountName: samAccountName
      }, new RequestOptions({
        headers: new Headers({
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        })
      })).subscribe(data => {
        resolve(data.json());
      });
    });
  }

  addUser(samAccountName: string) {
    return new Promise<Array<string>>(resolve => {
      this.http.post('http://localhost:5400/api/ADService/User/Add', {
        txtSamAccountName: samAccountName
      }, new RequestOptions({
        headers: new Headers({
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        })
      })).subscribe(data => {
        resolve(data.json());
      });
    });
  }

  resetPassword(samAccountName: string) {
    return new Promise<Array<string>>(resolve => {
      this.http.post('http://localhost:5400/api/ADService/User/ResetPassword', {
        txtSamAccountName: samAccountName
      }, new RequestOptions({
        headers: new Headers({
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        })
      })).subscribe(data => {
        resolve(data.json());
      });
    });
  }

  editUser(samAccountName: string, form: FormGroup) {
    return new Promise<Array<string>>(resolve => {
      this.http.post('http://localhost:5400/api/ADService/User/Edit', {
        txtSamAccountName: samAccountName,
        txtDescription: form.value.txtDescription
      }, new RequestOptions({
        headers: new Headers({
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        })
      })).subscribe(data => {
        resolve(data.json());
      });
    });
  }

}
