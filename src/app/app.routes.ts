import { Routes } from '@angular/router';
import { VnctestComponent } from './vnctest/vnctest.component';
import { Vnctest1Component } from './vnctest1/vnctest1.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';


export const routes: Routes = [
  { path: 'vnctest', component: VnctestComponent },
  { path: 'vnctest1', component: Vnctest1Component },
  { path: '', component: HomeComponent },
  { path: '**', component: NotfoundComponent } 
];
