import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeviceListPageRoutingModule } from './device-list-routing.module';

import { DeviceListPage } from './device-list.page';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { BLE } from '@ionic-native/ble/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeviceListPageRoutingModule
  ],
  declarations: [DeviceListPage],
  providers: [
    Diagnostic,
    BLE
  ]
})
export class DeviceListPageModule {}
