import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public formBuilder: FormBuilder, public userHelper: UserHelper) {
    this.userHelper.getUser(this.navParams.data.samAccountName).then((data) => {
      this.user = data;

      this.form = this.formBuilder.group({
        txtDescription: [(this.user.properties.description == null ? '' : this.user.properties.description[0]), Validators.required]
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditUserPage');
  }

  submit() {
    this.userHelper.addUser(this.form.value.txtSamAccountName).then((data) => {
      this.toastCtrl.create({
        message: 'User is edited',
        duration: 1000,
        position: 'middle'
      }).present();

      this.navCtrl.push('UserDetailsPage');
    });
  }

}
