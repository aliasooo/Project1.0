import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { Geolocation } from '@ionic-native/geolocation';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MainPage } from '../pages/main/main';
import { BillPaymentsPage } from '../pages/bill-payments/bill-payments';
import { MuseumDetailPage } from '../pages/museum-detail/museum-detail';
import { AllMuseumPage } from '../pages/all-museum/all-museum';
import { SearchMuseumPage } from '../pages/search-museum/search-museum';
import { HttpModule } from '@angular/http';
import { StandDetailsPage } from '../pages/stand-details/stand-details';
import { AvailableStandsPage } from '../pages/available-stands/available-stands';
import { MapViewPage } from '../pages/map-view/map-view';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MainPage,
    BillPaymentsPage,
    SearchMuseumPage,
    MuseumDetailPage,
    AllMuseumPage,
    AvailableStandsPage,
    MapViewPage,
    StandDetailsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MainPage,
    BillPaymentsPage,
    SearchMuseumPage,
    MuseumDetailPage,
    AllMuseumPage,
    StandDetailsPage,
    AvailableStandsPage,
    MapViewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
