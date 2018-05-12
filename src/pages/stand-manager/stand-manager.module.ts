import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StandManagerPage } from './stand-manager';

@NgModule({
  declarations: [
    StandManagerPage,
  ],
  imports: [
    IonicPageModule.forChild(StandManagerPage),
  ],
})
export class StandManagerPageModule {}
