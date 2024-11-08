import { Component } from '@angular/core';
import RFB from '@novnc/novnc/lib/rfb';

@Component({
  selector: 'app-vnctest',
  standalone: true,
  templateUrl: './vnctest.component.html',
  styleUrls: ['./vnctest.component.scss'],
})
export class VnctestComponent {
  title = 'vnc-client';
  public rfb: InstanceType<typeof RFB> | null = null;

  // 方法：啟動 VNC 客戶端，並接受動態的 `host` 和 `port`
  startClient(host: string, port: string, password: string) {
    console.log('Starting VNC client...');

    // 構建 WebSocket URL 用來連接
    let url = window.location.protocol === 'https:' ? 'wss' : 'ws';
    url += `://localhost:6080/${host}:${port}`;
    
    console.log('WebSocket URL: ', url);

    // 獲取畫面元素並初始化 RFB 連接
    const screenElement = document.getElementById('screen');
    if (screenElement) {
      // 初始化 RFB 物件，並使用動態的 `host`、`port` 和 `password`
      this.rfb = new RFB(screenElement, url, {
        credentials: { password: password },
        shared: true,
        view_only: false,  // 如果需要僅查看模式可設為 true
        true_color: true   // 設置為 true 以使用真彩模式
      });

      if (this.rfb) {
        console.log('RFB instance initialized successfully.');

        // 設置連接事件監聽
        this.rfb.addEventListener('connect', () => {
          console.log('Connected to VNC server.');
        });

        this.rfb.addEventListener('disconnect', (e: any) => {
          console.warn('Disconnected from VNC server.', e.detail);
        });

        this.rfb.addEventListener('securityfailure', (e: any) => {
          console.error('Security failure:', e.detail.reason);
        });
      } else {
        console.error('Failed to initialize RFB instance.');
      }
    } else {
      console.error("Cannot find 'screen' element.");
    }
  }

  // 方法：中斷連接
  disconnectClient() {
    if (this.rfb) {
      this.rfb.disconnect();
      this.rfb = null;
      console.log('Disconnected from VNC server.');
    } else {
      console.log('No active connection to disconnect.');
    }
  }
}
