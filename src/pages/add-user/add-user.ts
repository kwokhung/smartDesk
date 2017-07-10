import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserHelper } from '../../providers/user-helper/user-helper';

@IonicPage({
  name: 'AddUserPage'
})
@Component({
  selector: 'page-add-user',
  templateUrl: 'add-user.html',
})
export class AddUserPage {

  form: FormGroup;
  formSubmitted: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public toastCtrl: ToastController, public formBuilder: FormBuilder, public userHelper: UserHelper) {
    this.form = this.formBuilder.group({
      txtSamAccountName: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddUserPage');
  }

  ionViewDidEnter() {
    this.formSubmitted = false;
  }

  submit() {
    this.formSubmitted = true;

    this.userHelper.addUser(this.form.value.txtSamAccountName).then((data: any) => {
      if (data.status === "true") {
        this.toastCtrl.create({
          message: 'User is added',
          duration: 1000,
          position: 'middle'
        }).present();

        this.navCtrl.pop();
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

  cancel(event: Event) {
    event.preventDefault();

    this.navCtrl.pop();
  }

}
