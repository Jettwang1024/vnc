import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component'; // 新增這一行
import { VnctestComponent } from './app/vnctest/vnctest.component';
import { Vnctest1Component } from './app/vnctest1/vnctest1.component';

// 定義路由
const routes: Routes = [
  { path: '', redirectTo: 'vnctest', pathMatch: 'full' },
  { path: 'vnctest', component: VnctestComponent },
  { path: 'vnctest1', component: Vnctest1Component }
];

// 將 AppComponent 設為引導組件
bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
}).catch(err => console.error(err));
