import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  displaySidebar: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // 自動展開側邊欄，當路由包含 'vnctest' 或 'vnctest1' 時
        this.displaySidebar = event.url.includes('/vnctest') || event.url.includes('/vnctest1');
      }
    });
  }

  toggleSidebar() {
    this.displaySidebar = !this.displaySidebar;
  }
}
