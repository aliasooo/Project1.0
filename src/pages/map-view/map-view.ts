import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@IonicPage()
@Component({
  selector: 'page-map-view',
  templateUrl: 'map-view.html',
})
export class MapViewPage {
  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  standList = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation) {
    this.standList = navParams.get('standsList');
  }

  ionViewDidLoad() {
    this.displayGoogleMap();
    this.getMarkers();
  }

  displayGoogleMap() {
    let latLng = new google.maps.LatLng(-17.86411034, 31.04225509);

    let mapOptions = {
      center: latLng,
      disableDefaultUI: true,
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
  }

  getMarkers() {
    for (let _i = 0; _i < this.standList.length; _i++) {
      this.addMarkersToMap(this.standList[_i]);
    }
  }

  addMarkersToMap(stand) {
    var position = new google.maps.LatLng(stand.latitude, stand.longitude);
    var standMarker = new google.maps.Marker({ position: position, title: stand.area });
    standMarker.setMap(this.map);
  }

}
