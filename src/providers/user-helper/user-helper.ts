import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class UserHelper {

  //apiHost: string = 'http://localhost:5400';
  apiHost: string = 'http://172.21.73.35:8184/home';

  itemsPerPage = 15;
  requestedPage = 0;
  orderBy = 'name';
  direction = 'asc';

  userList: any;
  pages: any;
  totalItemCount: any;
  totalPageCount: any;

  constructor(public http: Http) {
  }

  getUsers(mode: string) {
    this.requestedPage = 0;

    if (mode === 'next') {
      for (let i = 0; i < this.pages.length; i++) {
        if (this.pages[i].LinkText === '»') {
          if (this.pages[i].IsRequestedPage) {
            return Promise.resolve({
              status: 'true',
              content:
              {
                userList: []
              }
            });
          }
          else {
            this.requestedPage = this.pages[i].LinkPage;
          }
        }
      }
    }

    return new Promise((resolve, reject) => {
      this.http.get(this.apiHost + `/api/ADService/User/PagedList?txtItemsPerPage=${this.itemsPerPage}&txtRequestedPage=${this.requestedPage}&txtOrderBy=${this.orderBy}&txtDirection=${this.direction}`, new RequestOptions({
        headers: new Headers({
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        })
      })).subscribe((data: Response) => {
        this.userList = data.json().content.userList;
        this.pages = data.json().content.pages;
        this.totalItemCount = data.json().content.totalItemCount;
        this.totalPageCount = data.json().content.totalPageCount;

        resolve(data.json());
      }, (data: any) => {
        reject(data);
      });
    });
  }

  getUser(samAccountName: string) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiHost + '/api/ADService/User/Get', {
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
      this.http.post(this.apiHost + '/api/ADService/User/Delete', {
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
      this.http.post(this.apiHost + '/api/ADService/User/Add', {
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
      this.http.post(this.apiHost + '/api/ADService/User/ResetPassword', {
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
      this.http.post(this.apiHost + '/api/ADService/User/Edit', {
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

  validateUser(samAccountName: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiHost + '/api/ADService/User/Validate', {
        txtSamAccountName: samAccountName,
        txtPassword: password
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
