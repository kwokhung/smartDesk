import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Logger } from '../../providers/logger/logger';

@IonicPage({
  name: 'LogPage'
})
@Component({
  selector: 'page-log',
  templateUrl: 'log.html',
})
export class LogPage {

  logs: Array<string> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public logger: Logger) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogPage');
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

}
