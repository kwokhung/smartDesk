import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowPropertiesPage } from './show-properties';

@NgModule({
  declarations: [
    ShowPropertiesPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowPropertiesPage),
  ],
  exports: [
    ShowPropertiesPage
  ]
})
export class ShowPropertiesPageModule {}
