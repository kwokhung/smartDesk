import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public userHelper: UserHelper) {
    this.userHelper.getUser(this.navParams.data.samAccountName).then((data) => {
      this.user = data;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserDetailsPage');
  }

  deleteUser(user) {
    this.userHelper.deleteUser(user.properties.sAMAccountName[0]).then((data) => {
      this.toastCtrl.create({
        message: 'User is deleted',
        duration: 1000,
        position: 'middle'
      }).present();

      this.navCtrl.push('UserPage');
    });
  }

}
