import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyStandsPage } from './my-stands';

@NgModule({
  declarations: [
    MyStandsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyStandsPage),
  ],
})
export class MyStandsPageModule {}
