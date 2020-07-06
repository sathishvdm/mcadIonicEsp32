import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LayoutMainPageRoutingModule } from './layout-main-routing.module';

import { LayoutMainPage } from './layout-main.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LayoutMainPageRoutingModule
  ],
  declarations: [LayoutMainPage]
})
export class LayoutMainPageModule {}
