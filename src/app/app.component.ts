import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
import { MainPage } from '../pages/main/main';

const config = {
  apiKey: "AIzaSyAwp7I3aM5ENEu1gITU_yUk6oNwLTHmAvQ",
  authDomain: "land-manager.firebaseapp.com",
  databaseURL: "https://land-manager.firebaseio.com",
  projectId: "land-manager",
  storageBucket: "land-manager.appspot.com",
  messagingSenderId: "478647188127"
};


@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage: any = MainPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(config);
  }
}
