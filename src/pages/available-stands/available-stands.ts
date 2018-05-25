import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { StandDetailsPage } from '../stand-details/stand-details';
import { MapViewPage } from '../map-view/map-view';
import { DataService } from '../../services/data.service';

@IonicPage()
@Component({
  selector: 'page-available-stands',
  templateUrl: 'available-stands.html',
})
export class AvailableStandsPage {
  standsList = [];
  filteredStands = [];
  isFiltered = false;

  constructor(public loadingCtrl: LoadingController, private dataService: DataService, public navCtrl: NavController, public navParams: NavParams) {
    this.getAllStands();
  }

  searchStands(event) {
    if (event.target.value.length > 2) {
      let filtered = this.standsList.filter(function (row) {
        if (row.state.indexOf(event.target.value) != -1) {
          return true;
        } else {
          return false;
        }
      });
      this.isFiltered = true;
      this.filteredStands = filtered;
    }
  }

  itemTapped(event, stand) {
    this.navCtrl.push(StandDetailsPage, {
      stand: stand
    });
  }

  allStandsMap() {
    this.navCtrl.push(MapViewPage, {
      standsList: this.standsList
    });
  }

  getAllStands() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.dataService.getNewStandsAreas()
      .valueChanges()
      .subscribe(data => {
        this.standsList = data;
        loading.dismiss();
      },
        err => {
          loading.dismiss();
        })
  }
}
