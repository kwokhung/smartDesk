import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { UserHelper } from '../../providers/user-helper/user-helper';

@IonicPage({
  name: 'UserPage'
})
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  users: Array<any> = [];
  infiniteScroll: any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public toastCtrl: ToastController, public userHelper: UserHelper) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

  ionViewDidEnter() {
    this.getUsers(null);
  }

  getUsers(infiniteScroll: any) {
    this.userHelper.getUsers(infiniteScroll).then((data: any) => {
      if (data.status === "true") {
        if (infiniteScroll === null) {
          this.users = data.content.userList.slice(0);
        }
        else if (infiniteScroll !== null) {
          if (data.content.userList.length !== 0) {
            for (let user of data.content.userList) {
              this.users.push(user);
            }
          }
        }
      }
      else {
        this.alertCtrl.create({
          title: JSON.stringify(data.errMsg),
          subTitle: JSON.stringify(data.content.detailMessage),
          buttons: ["Close"]
        }).present();
      }
    }, (data: any) => {
      this.alertCtrl.create({
        title: 'System Error',
        subTitle: JSON.stringify(data),
        buttons: ["Close"]
      }).present();
    });
  }

  openUserDetails(user) {
    this.navCtrl.push('UserDetailsPage', user);
  }

  addUser() {
    this.navCtrl.push('AddUserPage');
  }

  deleteUser(user) {
    this.alertCtrl.create({
      title: 'Delete User',
      message: 'Confirm to proceed?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.userHelper.deleteUser(user.samAccountName).then((data: any) => {
              if (data.status === "true") {
                this.toastCtrl.create({
                  message: 'User is deleted',
                  duration: 1000,
                  position: 'middle'
                }).present();

                this.ionViewDidEnter();
              }
              else {
                this.alertCtrl.create({
                  title: JSON.stringify(data.errMsg),
                  subTitle: JSON.stringify(data.content.detailMessage),
                  buttons: ["Close"]
                }).present();
              }
            }, (data: any) => {
              this.alertCtrl.create({
                title: 'System Error',
                subTitle: JSON.stringify(data),
                buttons: ["Close"]
              }).present();
            });
          }
        },
        {
          text: 'No',
          handler: () => {
          }
        }
      ]
    }).present();
  }

  resetPassword(user) {
    this.alertCtrl.create({
      title: 'Reset Password',
      message: 'Confirm to proceed?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.userHelper.resetPassword(user.samAccountName).then((data: any) => {
              if (data.status === "true") {
                this.toastCtrl.create({
                  message: 'Password is reset',
                  duration: 1000,
                  position: 'middle'
                }).present();
              }
              else {
                this.alertCtrl.create({
                  title: JSON.stringify(data.errMsg),
                  subTitle: JSON.stringify(data.content.detailMessage),
                  buttons: ["Close"]
                }).present();
              }
            }, (data: any) => {
              this.alertCtrl.create({
                title: 'System Error',
                subTitle: JSON.stringify(data),
                buttons: ["Close"]
              }).present();
            });
          }
        },
        {
          text: 'No',
          handler: () => {
          }
        }
      ]
    }).present();
  }

  editUser(user) {
    this.navCtrl.push('EditUserPage', user);
  }

  doRefresh(refresher) {
    if (this.infiniteScroll !== null) {
      this.infiniteScroll.enable(true);
    }

    this.getUsers(null);

    refresher.complete();
  }

  doInfinite(infiniteScroll) {
    this.infiniteScroll = infiniteScroll;

    setTimeout(() => {
      this.getUsers(infiniteScroll);

      infiniteScroll.complete();
    }, 500);
  }

}
