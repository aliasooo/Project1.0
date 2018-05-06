import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Museum } from '../../models/museum';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@IonicPage()
@Component({
  selector: 'page-stand-details',
  templateUrl: 'stand-details.html',
})
export class StandDetailsPage {
  @ViewChild('map') mapContainer: ElementRef;
  public map: any;
  stand = {} as Museum;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation) {
    this.stand = navParams.get('stand');
  }

  ionViewDidLoad() {
    this.displayStandDetails();
  }

  private displayStandDetails() {
    let latLng = new google.maps.LatLng(this.stand.latitude, this.stand.longitude);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });
    this.addInfoWindow(marker, this.stand.name + this.stand.state);
  }

  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }
}
