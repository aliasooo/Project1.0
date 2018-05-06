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
    this.standList = navParams.get('standList');
  }

  ionViewDidLoad() {
    this.displayGoogleMap();
    this.getMarkers();
  }

  displayGoogleMap() {
    let latLng = new google.maps.LatLng(28.6117993, 77.2194934);

    let mapOptions = {
      center: latLng,
      disableDefaultUI: true,
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
  }

  getMarkers() {
    for (let _i = 0; _i < this.standList.length; _i++) {
      if (_i > 0)
        this.addMarkersToMap(this.standList[_i]);
    }
  }

  addMarkersToMap(museum) {
    var position = new google.maps.LatLng(museum.latitude, museum.longitude);
    var museumMarker = new google.maps.Marker({ position: position, title: museum.name });
    museumMarker.setMap(this.map);
  }

}
