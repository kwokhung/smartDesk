import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { Logger } from '../../providers/logger/logger';
import { AuthService } from '../../providers/auth-service/auth-service';

@IonicPage({
  name: 'LoginPage'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loading: Loading;
  registerCredentials = { name: '', password: '' };

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public authService: AuthService, public logger: Logger) {
    logger.addLog('LoginPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public submit() {
    this.showLoading();

    this.authService.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {
        this.navCtrl.setRoot('HomePage');
      } else {
        this.showError("Access Denied");
      }
    }, error => {
      this.showError(error);
    });
  }

  public createAccount(event: Event) {
    event.preventDefault();

    this.navCtrl.push('RegisterPage');
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });

    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    }).present(prompt);
  }

}
