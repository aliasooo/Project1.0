import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'page-bill-payments',
  templateUrl: 'bill-payments.html'
})
export class BillPaymentsPage {
  binBalance = 0;
  wasteBalance = 0;
  waterBalance = 0;
  billBalance = 0;
  testRadioResult: any;
  testRadioOpen: boolean;
  loading;


  constructor(public loadingCtrl: LoadingController, private dataService: DataService, public navCtrl: NavController, public alertCtrl: AlertController) {
    this.getBills();
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

  getBills() {
    this.showLoading();
    this.dataService.getUserStands()
      .snapshotChanges()
      .subscribe(data => {
        data.forEach(stand => {
          this.dataService.standSearch(stand.key)
            .valueChanges()
            .subscribe(res => {
              res.forEach(item => {
                this.wasteBalance += parseInt(item.Waste);
                this.waterBalance += parseInt(item.Water);
                this.binBalance += parseInt(item.Bins);
                this.billBalance += parseInt(item.Waste) + parseInt(item.Water) + parseInt(item.Bins);
              })
              this.dismissLoading();
            });
        });
      })

  }

  public tasks() {
    let confirm = this.alertCtrl.create({
      title: 'Bill Payment',
      message: this.billBalance > 0 ? 'Are you sure you want to pay your bills?' : 'Your bills are all paid up!',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
          }
        },
        {
          text: this.billBalance > 0 ? 'Confirm' : 'Okay',
          handler: () => {
            this.showLoading();
            this.wasteBalance = 0;
            this.waterBalance = 0;
            this.binBalance = 0;
            this.billBalance = 0;
            this.dataService.getUserStands()
              .snapshotChanges()
              .subscribe(data => {
                data.forEach(stand => {
                  this.dataService.standSearch(stand.key)
                    .valueChanges()
                    .subscribe(res => {
                      res.forEach(item => {
                        this.dataService.payBills(item.area, item.standId);
                      });
                      this.dismissLoading();
                    });
                });
              })
          }
        }
      ]
    });
    confirm.present();
  }
}
