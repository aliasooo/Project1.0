import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AlertInputOptions } from 'ionic-angular/components/alert/alert-options';

@Component({
  selector: 'page-bill-payments',
  templateUrl: 'bill-payments.html'
})
export class BillPaymentsPage {

  testRadioResult: any;
  testRadioOpen: boolean;
  constructor(public navCtrl: NavController,public alertCtrl: AlertController) {

  }

  public tasks(){
    let alert = this.alertCtrl.create();
    alert.setTitle('Pay Bill');

    alert.addInput({
      type: 'radio',
      label: 'Bin Collection',
      value: '',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'Waste Management',
      value: ''
    });

    alert.addInput({
      type: 'radio',
      label: 'Rates',
      value: ''
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: data => {
        this.testRadioOpen = false;
        this.testRadioResult = data;
      }
    });

    alert.present().then(() => {
      this.testRadioOpen = true;
    });
  }
}
