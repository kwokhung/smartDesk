import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserHelper } from '../../providers/user-helper/user-helper';

@IonicPage({
  name: 'ShowPropertiesPage'
})
@Component({
  selector: 'page-show-properties',
  templateUrl: 'show-properties.html',
})
export class ShowPropertiesPage {

  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public userHelper: UserHelper) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowPropertiesPage');
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

}
