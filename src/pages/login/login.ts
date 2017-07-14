import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
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
  form: FormGroup;
  formSubmitted: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public formBuilder: FormBuilder, public authService: AuthService, public logger: Logger) {
    logger.addLog('LoginPage');

    this.form = this.formBuilder.group({
      txtName: ['', Validators.required],
      txtPassword: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ionViewDidEnter() {
    this.formSubmitted = false;
  }

  public submit() {
    this.formSubmitted = true;

    this.showLoading();

    this.authService.login({
      name: this.form.value.txtName,
      password: this.form.value.txtPassword
    }).subscribe(allowed => {
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
