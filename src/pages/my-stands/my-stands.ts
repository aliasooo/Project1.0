import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { DataService } from '../../services/data.service';
import { StandDetailsPage } from '../stand-details/stand-details';
import { BillPaymentsPage } from '../bill-payments/bill-payments';

@IonicPage()
@Component({
  selector: 'page-my-stands',
  templateUrl: 'my-stands.html',
})
export class MyStandsPage {
  testRadioResult: any;
  testRadioOpen: boolean;
  myStands = [];
  loading;

  constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController, private dataService: DataService, public navCtrl: NavController, public navParams: NavParams) {
    this.getStands();
  }

  ionViewDidLoad() {

  }

  showLoading() {
    if (!this.loading) {
      this.loading = this.loadingCtrl.create({
        content: 'Please Wait...'
      });
      this.loading.present();
    }
  }

  dismissLoading() {
    if (this.loading) {
      this.loading.dismiss();
      this.loading = null;
    }
  }


  getStands() {
    this.showLoading();
    this.dataService.getUserStands()
      .snapshotChanges()
      .subscribe(data => {
        data.forEach(stand => {
          this.dataService.standSearch(stand.key)
            .valueChanges()
            .subscribe(res => {
              this.myStands = this.myStands.concat(res);
              this.dismissLoading();
            });
        });
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

  buy(area, stand) {
    this.showLoading();

    let alert = this.alertCtrl.create();
    alert.setTitle('Choose payment method');

    alert.addInput({
      type: 'radio',
      label: 'Ecocash',
      value: 'ecocash',
      checked: false
    });
    alert.addInput({
      type: 'radio',
      label: 'Telecash',
      value: 'telecash',
      checked: false
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Pay',
      handler: data => {
        this.dataService.makePayment(area, stand)
          .then(() => {
            this.dismissLoading();
            this.navCtrl.popToRoot();
            this.navCtrl.push(MyStandsPage);
          });
      }
    });
    alert.present();

  }
}
