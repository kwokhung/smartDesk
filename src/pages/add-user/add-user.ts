import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';

@IonicPage({
  name: 'AddUserPage'
})
@Component({
  selector: 'page-add-user',
  templateUrl: 'add-user.html',
})
export class AddUserPage {

  config: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public formBuilder: FormBuilder, public http: Http) {
    this.config = this.formBuilder.group({
      txtSamAccountName: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddUserPage');
  }

  submit() {
    this.http.post('http://localhost:5400/api/ADService/User/Add', {
      txtSamAccountName: this.config.value.txtSamAccountName
    }, new RequestOptions({
      headers: new Headers({ 'Content-Type': 'application/json' })
    })).subscribe(data => {
      this.toastCtrl.create({
        message: 'User is added',
        duration: 1000
      }).present();

      this.navCtrl.push('UserPage');
    }, error => {
      this.toastCtrl.create({
        message: JSON.stringify(error),
        duration: 1000
      }).present();
    });
  }

}
