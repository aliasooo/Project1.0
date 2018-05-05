import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchMuseumPage } from './search-museum';

@NgModule({
  declarations: [
    SearchMuseumPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchMuseumPage),
  ],
})
export class SearchMuseumPageModule {}
