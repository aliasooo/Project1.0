import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AvailableStandsPage } from './available-stands';

@NgModule({
  declarations: [
    AvailableStandsPage,
  ],
  imports: [
    IonicPageModule.forChild(AvailableStandsPage),
  ],
})
export class AvailableStandsPageModule {}
