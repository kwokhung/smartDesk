import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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

  config: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public formBuilder: FormBuilder, public userHelper: UserHelper) {
    this.config = this.formBuilder.group({
      txtSamAccountName: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddUserPage');
  }

  submit() {
    this.userHelper.addUser(this.config.value.txtSamAccountName).then((data) => {
      this.toastCtrl.create({
        message: 'User is added',
        duration: 1000,
        position: 'middle'
      }).present();

      this.navCtrl.push('UserPage');
    });
  }

}
