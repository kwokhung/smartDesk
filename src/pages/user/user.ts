import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public userHelper: UserHelper) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

  ionViewDidEnter() {
    this.getUsers();
  }

  getUsers() {
    this.userHelper.getUsers().then((data) => {
      this.users = data;
    });
  }

  openUserDetails(user) {
    this.navCtrl.push('UserDetailsPage', user);
  }

  addUser() {
    this.navCtrl.push('AddUserPage');
  }

  deleteUser(user) {
    this.userHelper.deleteUser(user.samAccountName).then((data) => {
      this.toastCtrl.create({
        message: 'User is deleted',
        duration: 1000,
        position: 'middle'
      }).present();

      this.navCtrl.push('UserPage');
    });
  }

  resetPassword(user) {
    this.userHelper.resetPassword(user.samAccountName).then((data) => {
      this.toastCtrl.create({
        message: 'Password is reset',
        duration: 1000,
        position: 'middle'
      }).present();
    });
  }

}
