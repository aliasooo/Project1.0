import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { BillPaymentsPage } from '../bill-payments/bill-payments';
import { AvailableStandsPage } from '../available-stands/available-stands';

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  public rootPage;
  public billPayments = BillPaymentsPage;
  public stands = AvailableStandsPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.rootPage = HomePage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

  openPage(p) {
    this.navCtrl.push(p);
  }

}
