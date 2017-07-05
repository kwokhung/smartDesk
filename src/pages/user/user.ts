import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public userHelper: UserHelper) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');

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

}
