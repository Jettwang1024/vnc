import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import RFB from '@novnc/novnc/lib/rfb';

@Component({
  selector: 'app-vnctest1',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './vnctest1.component.html',
  styleUrls: ['./vnctest1.component.scss']
})
export class Vnctest1Component {
  public connections: any[] = [];
  public viewOnly = false;  // 是否僅限查看模式
  public trueColor = true;  // 是否使用真彩色
  public host = 'localhost';
  public port = '5901';
  public password = 'kangs';
  public path = 'websockify';
  public connected = false;
  public states: any[] = [];
  private rfb: InstanceType<typeof RFB> | null = null; // 使用 'InstanceType<typeof RFB>'

  addConnection() {
    this.connections.push({});
  }

  removeConnection(index: number) {
    this.connections.splice(index, 1);
  }

  startClient() {
    // 使用當前綁定的變量值來建立 VNC 連接
    const url = `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${this.host}:${this.port}/${this.path}`;
    const screenElement = document.getElementById('vnc-screen') as HTMLElement; // 使用 'vnc-screen' ID

    // 檢查是否存在 screen 元素
    if (screenElement) {
      screenElement.innerHTML = ''; // 清空舊畫面，避免重複渲染

      // 創建 RFB 連接
      this.rfb = new RFB(screenElement, url, {
        credentials: { password: this.password },
        shared: true,
        view_only: this.viewOnly,  // 設置為僅限查看模式
        true_color: this.trueColor // 設置為真彩色
      });

      // 事件監聽
      this.rfb.addEventListener('connect', () => {
        console.log('Connected to VNC server.');
        this.connected = true;
      });

      this.rfb.addEventListener('disconnect', () => {
        console.log('Disconnected from VNC server.');
        this.connected = false;
      });

      this.rfb.addEventListener('securityfailure', (e: any) => {
        console.error('Security failure:', e.detail.reason);
      });
    } else {
      console.error('Cannot find "vnc-screen" element.');
    }
  }
}
