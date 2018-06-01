import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { Geolocation } from '@ionic-native/geolocation';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BillPaymentsPage } from '../pages/bill-payments/bill-payments';
import { HttpModule } from '@angular/http';
import { StandDetailsPage } from '../pages/stand-details/stand-details';
import { AvailableStandsPage } from '../pages/available-stands/available-stands';
import { MapViewPage } from '../pages/map-view/map-view';
import { CurrencyPipe } from '@angular/common';
import { AngularFireModule } from 'angularfire2'
import { config } from './app.firebase.config';
import { LoginPage } from '../pages/login/login';
import { AngularFireAuthModule } from "angularfire2/auth";
import { DataService } from '../services/data.service';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { MyStandsPage } from '../pages/my-stands/my-stands';
import { StandManagerPage } from '../pages/stand-manager/stand-manager';
import { GoogleMaps } from "@ionic-native/google-maps";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BillPaymentsPage,
    AvailableStandsPage,
    MapViewPage,
    StandDetailsPage,
    LoginPage,
    MyStandsPage,
    StandManagerPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    AngularFireModule.initializeApp(config),
    IonicModule.forRoot(MyApp),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BillPaymentsPage,
    StandDetailsPage,
    AvailableStandsPage,
    MapViewPage,
    LoginPage,
    MyStandsPage,
    StandManagerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    GoogleMaps,
    CurrencyPipe,
    DataService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
