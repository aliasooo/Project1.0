import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MuseumDetailPage } from './museum-detail';

@NgModule({
  declarations: [
    MuseumDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MuseumDetailPage),
  ],
})
export class MuseumDetailPageModule {}
