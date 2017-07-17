import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../providers/auth-service/auth-service';

@IonicPage({
  name: 'RegisterPage'
})
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  createSuccess = false;
  form: FormGroup;
  formSubmitted: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public formBuilder: FormBuilder, public authService: AuthService) {
    this.form = this.formBuilder.group({
      txtName: ['', Validators.required],
      txtPassword: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  ionViewDidEnter() {
    this.formSubmitted = false;
  }

  public submit() {
    this.formSubmitted = true;

    this.authService.register({
      name: this.form.value.txtName,
      password: this.form.value.txtPassword
    }).subscribe(success => {
      if (success) {
        this.createSuccess = true;
        this.showPopup("Success", "Account created.");
      } else {
        this.showPopup("Error", "Problem creating account.");
      }
    },
      error => {
        this.showPopup("Error", error);
      });
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.navCtrl.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }

}
