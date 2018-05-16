import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { DataService } from '../../services/data.service';
import { Stands } from '../../models/stands';

/**
 * Generated class for the StandManagerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stand-manager',
  templateUrl: 'stand-manager.html',
})
export class StandManagerPage {
  area: any;
  newStand = {} as Stands;
  availableStands: any;
  isEdit = false;
  isManage = false;
  applicants: any;
  selectedArea: string;
  loading;
  constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController, private dataService: DataService, public navCtrl: NavController, public navParams: NavParams) {
    this.getStands()
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

  addNew() {
    this.dataService.newStands(this.newStand)
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      duration: 2000
    });
    loading.present();
    this.isEdit = false;
    this.isManage = false;
  }

  getStands() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.dataService.getNewStandsAreas()
      .valueChanges()
      .subscribe(data => {
        loading.dismiss();
        this.availableStands = data;
      },
        err => {
          loading.dismiss();
        })
  }

  getApplicants(area) {
    this.isManage = true;
    this.isEdit = false;
    this.selectedArea = area;
    this.showLoading();
    console.log(area);

    this.dataService.getAreaApplicants(area)
      .valueChanges()
      .subscribe(data => {
        console.log(data);

        this.dismissLoading();
        this.applicants = data;
      })
  }

  assign(applicant: string, ) {
    let prompt = this.alertCtrl.create({
      title: 'Stand Approval',
      message: "Provide a stand number below",
      inputs: [
        {
          name: 'standNumber',
          placeholder: 'Stand Number',
          type: 'number'
        },
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: standNumber => {
            let loading = this.loadingCtrl.create({
              content: 'Please wait...'
            });
            loading.present();
            this.dataService.assignStandNumber(this.selectedArea, applicant, standNumber)
              .snapshotChanges()
              .subscribe(data => {
                data.forEach(item => {
                  standNumber.status = 'Owned';
                  this.dataService.updateStandNumber(this.selectedArea, applicant, standNumber)
                    .then(res => {
                      loading.dismiss();
                    })
                })
              });
          }
        }
      ]
    });
    prompt.present();
  }

  approve(id: string) {
    this.showLoading();
    this.dataService.paymentRequest(this.selectedArea, id)
      .then(() => {
        this.dismissLoading();
        let alert = this.alertCtrl.create({
          title: 'Success!',
          subTitle: 'Application approved. Awaiting payment',
          buttons: ['OK']
        });
        alert.present();
      })

  }

}
