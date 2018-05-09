import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DataService } from '../../services/data.service';

@IonicPage()
@Component({
  selector: 'page-my-stands',
  templateUrl: 'my-stands.html',
})
export class MyStandsPage {
  myStands: any;

  constructor(public loadingCtrl: LoadingController, private dataService: DataService, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.getStands();
  }

  getStands() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.dataService.getUserStands()
      .valueChanges().
      subscribe(data => {
        this.myStands = data;
        loading.dismiss();
      })

  }

}
