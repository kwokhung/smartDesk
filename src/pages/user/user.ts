import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserHelper } from '../../providers/userHelper/userHelper';

@IonicPage({
  name: 'UserPage'
})
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  users: Array<string> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public userHelper: UserHelper) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');

    this.getUsers();
  }

  getUsers() {
    this.userHelper.getUsers().then((data) => {
      this.users = data.slice(0);
      this.users = this.users.reverse();
    });
  }

  openUserDetails(user) {
    this.alertCtrl.create({
      title: "User Details",
      subTitle: JSON.stringify(user),
      buttons: ["Close"]
    }).present();
  }

}
