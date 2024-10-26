import { Routes } from '@angular/router';
import { VnctestComponent } from './vnctest/vnctest.component';
import { Vnctest1Component } from './vnctest1/vnctest1.component';

export const routes: Routes = [
  { path: 'vnctest', component: VnctestComponent },
  { path: 'vnctest1', component: Vnctest1Component },
  { path: '', redirectTo: '/vnctest', pathMatch: 'full' } // 只在默認路徑時重定向
];
