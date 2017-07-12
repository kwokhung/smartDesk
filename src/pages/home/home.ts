import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Logger } from '../../providers/logger/logger';

@IonicPage({
  name: 'HomePage'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  logs: Array<string> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public logger: Logger) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  ionViewDidEnter() {
    this.getLogs();
  }

  getLogs() {
    this.logger.getLogs().then((data) => {
      this.logs = data.slice(0);
      this.logs = this.logs.reverse();
    });
  }

  openLogDetails(log) {
    this.alertCtrl.create({
      title: "Log Details",
      subTitle: JSON.stringify(log),
      buttons: ["Close"]
    }).present();
  }

}
