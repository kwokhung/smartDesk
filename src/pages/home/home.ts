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

  username = '';
  email = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public authService: AuthService, public logger: Logger) {
    let info = this.authService.getUserInfo();
    this.username = info['name'];
    this.email = info['email'];
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
