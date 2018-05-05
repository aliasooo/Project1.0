import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AllMuseumPage } from '../all-museum/all-museum';
import { MuseumDetailPage } from '../museum-detail/museum-detail';

/**
 * Generated class for the SearchMuseumPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-museum',
  templateUrl: 'search-museum.html',
})
export class SearchMuseumPage {
  museumList = [];
  filteredMuseum = [];
  isfiltered: boolean;

  constructor(private http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.isfiltered = false;
    this.http.get('assets/data/museum.json')
      .map(res => res.json())
      .subscribe(data => {
        this.museumList = data.museums;
      },
        err => console.log("error is " + err), // error
        () => console.log('read museum data Complete ' + this.museumList) // complete
      );
  }

  searchMaps(event) {
    if (event.target.value.length > 2) {
      var filteredJson = this.museumList.filter(function (row) {
        if (row.state.indexOf(event.target.value) != -1) {
          return true
        } else {
          return false;
        }
      });
      this.isfiltered = true;
      this.filteredMuseum = filteredJson;
    }
  }

  itemTapped(event, museum) {
    this.navCtrl.push(MuseumDetailPage, {
      museum: museum
    });
  }

  allMuseumMap() {
    this.navCtrl.push(AllMuseumPage, {
      museumList: this.museumList
    });
  }
}