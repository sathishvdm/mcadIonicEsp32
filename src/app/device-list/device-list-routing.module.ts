import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeviceListPage } from './device-list.page';

const routes: Routes = [
  {
    path: '',
    component: DeviceListPage
  },
  {
    path: 'layout-main',
    loadChildren: () => import('../layout-main/layout-main.module').then( m => m.LayoutMainPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeviceListPageRoutingModule {}
