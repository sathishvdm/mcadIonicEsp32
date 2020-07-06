import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutMainPage } from './layout-main.page';

const routes: Routes = [
  {
    path: '',
    component: LayoutMainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutMainPageRoutingModule {}
