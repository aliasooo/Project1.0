import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {} as User;
  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private angularAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async login(user: User) {

    try {
      const result = this.angularAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if (result) {
        this.navCtrl.push('MainPage')
      }
    }
    catch (e) {
      console.log(e);

      let alert = this.alertCtrl.create({
        title: 'Error!',
        subTitle: 'Invalid credentials!',
        buttons: ['OK']
      });
      alert.present();
      this.navCtrl.push(LoginPage);
    }
  }

  register() {
    this.navCtrl.push('RegisterPage')
  }
}
