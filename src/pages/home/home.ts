import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Logger } from '../../providers/logger/logger';
import { AuthService } from '../../providers/auth-service/auth-service';

@IonicPage({
  name: 'HomePage'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public authService: AuthService, public logger: Logger) {
    this.user = this.authService.getUserInfo();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  public logout() {
    this.authService.logout().subscribe(succ => {
      this.navCtrl.setRoot('LoginPage')
    });
  }

}
