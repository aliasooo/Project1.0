import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StandDetailsPage } from './stand-details';

@NgModule({
  declarations: [
    StandDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(StandDetailsPage),
  ],
})
export class StandDetailsPageModule {}
