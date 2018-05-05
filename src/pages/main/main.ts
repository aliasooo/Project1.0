import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { BillPaymentsPage } from '../bill-payments/bill-payments';
import { SearchMuseumPage } from '../search-museum/search-museum';

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  public rootPage;
  public billPayments = BillPaymentsPage;
  public search = SearchMuseumPage;
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
