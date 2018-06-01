import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Stands } from '../../models/stands';
import { DataService } from '../../services/data.service';

declare var google;

@IonicPage()
@Component({
  selector: 'page-stand-details',
  templateUrl: 'stand-details.html',
})

export class StandDetailsPage {
  @ViewChild('map') mapContainer: ElementRef;
  public map: any;
  stand = {} as any;

  constructor(public alertCtrl: AlertController, private dataService: DataService, public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation) {
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
    this.addInfoWindow(marker, this.stand.area + this.stand.city);
  }

  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

  onSubmit() {
    this.dataService.addStand(this.stand)
      .then(result => {
        let alert = this.alertCtrl.create({
          title: 'Success!',
          subTitle: 'Application was successful!',
          buttons: ['OK']
        });
        alert.present();
      },
        error => {
          let alert = this.alertCtrl.create({
            title: 'Error!',
            subTitle: 'Sorry application failed!',
            buttons: ['OK']
          });
          alert.present();
        })
  }

}
