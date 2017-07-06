import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { UserHelper } from '../../providers/user-helper/user-helper';

@IonicPage({
  name: 'UserDetailsPage'
})
@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html',
})
export class UserDetailsPage {

  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public toastCtrl: ToastController, public userHelper: UserHelper) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserDetailsPage');
  }

  ionViewDidEnter() {
    this.getUser();
  }

  getUser() {
    this.userHelper.getUser(this.navParams.data.samAccountName).then((data: any) => {
      if (data.status === "true") {
        this.user = data.content.user;
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

  deleteUser(user) {
    this.alertCtrl.create({
      title: 'Delete User',
      message: 'Confirm to proceed?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.userHelper.deleteUser(user.properties.sAMAccountName[0]).then((data: any) => {
              if (data.status === "true") {
                this.toastCtrl.create({
                  message: 'User is deleted',
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

  resetPassword(user) {
    this.alertCtrl.create({
      title: 'Reset Password',
      message: 'Confirm to proceed?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.userHelper.resetPassword(user.properties.sAMAccountName[0]).then((data: any) => {
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

}
