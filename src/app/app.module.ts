import { SidebarModule } from 'primeng/sidebar';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

// 定義路由
const routes: Routes = [
    // 範例路由
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    // 其他路由...
  ];

@NgModule({
  declarations: [
    AppComponent,
     SidebarComponent 
    // 您的元件
  ],
  imports: [
    // 其他模組
    SidebarModule,
    RouterModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    AppRoutingModule 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
