import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../models/user';
import { DataService } from '../../services/data.service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {} as User;
  constructor(private dataService: DataService, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  login(user: User) {
    this.dataService.login(user)
      .then((result) => {
        this.navCtrl.push('MainPage')
      }).catch((err) => {
        let alert = this.alertCtrl.create({
          title: 'Error!',
          subTitle: 'Invalid credentials!',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.setRoot(LoginPage);
      });
  }


  register() {
    this.navCtrl.push('RegisterPage')
  }
}
