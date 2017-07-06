import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserHelper } from '../../providers/user-helper/user-helper';

@IonicPage({
  name: 'EditUserPage'
})
@Component({
  selector: 'page-edit-user',
  templateUrl: 'edit-user.html',
})
export class EditUserPage {

  user: any;
  form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public toastCtrl: ToastController, public formBuilder: FormBuilder, public userHelper: UserHelper) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditUserPage');
  }

  ionViewDidEnter() {
    this.getUser();
  }

  getUser() {
    this.userHelper.getUser(this.navParams.data.samAccountName).then((data: any) => {
      this.user = data.content.user;

      this.form = this.formBuilder.group({
        txtDescription: [(this.user.properties.description == null ? '' : this.user.properties.description[0]), Validators.required]
      });
    });
  }

  submit() {
    this.userHelper.editUser(this.user.samAccountName, this.form).then((data: any) => {
      if (data.status === "true") {
        this.toastCtrl.create({
          message: 'User is edited',
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

}
