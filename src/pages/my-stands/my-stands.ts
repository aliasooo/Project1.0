import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DataService } from '../../services/data.service';
import { StandDetailsPage } from '../stand-details/stand-details';
import { BillPaymentsPage } from '../bill-payments/bill-payments';

@IonicPage()
@Component({
  selector: 'page-my-stands',
  templateUrl: 'my-stands.html',
})
export class MyStandsPage {
  myStands: any;

  constructor(public loadingCtrl: LoadingController, private dataService: DataService, public navCtrl: NavController, public navParams: NavParams) {
    this.getStands();
  }

  ionViewDidLoad() {

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
      },
        err => {
          loading.dismiss();
          console.log(err);

        })

  }

  itemTapped(event, stand) {
    this.navCtrl.push(StandDetailsPage, {
      stand: stand
    });
  }

  payBills() {
    this.navCtrl.push(BillPaymentsPage);
  }

}
