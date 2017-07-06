import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class UserHelper {

  constructor(public http: Http) {
  }

  getUsers() {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:5400/api/ADService/User/List', new RequestOptions({
        headers: new Headers({
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        })
      })).subscribe((data: Response) => {
        resolve(data.json());
      }, (data: any) => {
        reject(data);
      });
    });
  }

  getUser(samAccountName: string) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:5400/api/ADService/User/Get', {
        txtSamAccountName: samAccountName
      }, new RequestOptions({
        headers: new Headers({
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        })
      })).subscribe((data: Response) => {
        resolve(data.json());
      }, (data: any) => {
        reject(data);
      });
    });
  }

  deleteUser(samAccountName: string) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:5400/api/ADService/User/Delete', {
        txtSamAccountName: samAccountName
      }, new RequestOptions({
        headers: new Headers({
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        })
      })).subscribe((data: Response) => {
        resolve(data.json());
      }, (data: any) => {
        reject(data);
      });
    });
  }

  addUser(samAccountName: string) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:5400/api/ADService/User/Add', {
        txtSamAccountName: samAccountName
      }, new RequestOptions({
        headers: new Headers({
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        })
      })).subscribe((data: Response) => {
        resolve(data.json());
      }, (data: any) => {
        reject(data);
      });
    });
  }

  resetPassword(samAccountName: string) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:5400/api/ADService/User/ResetPassword', {
        txtSamAccountName: samAccountName
      }, new RequestOptions({
        headers: new Headers({
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        })
      })).subscribe((data: Response) => {
        resolve(data.json());
      }, (data: any) => {
        reject(data);
      });
    });
  }

  editUser(samAccountName: string, form: FormGroup) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:5400/api/ADService/User/Edit', {
        txtSamAccountName: samAccountName,
        txtDescription: form.value.txtDescription
      }, new RequestOptions({
        headers: new Headers({
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        })
      })).subscribe((data: Response) => {
        resolve(data.json());
      }, (data: any) => {
        reject(data);
      });
    });
  }

}
