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

  startClient() {
    console.log('Starting VNC client...');

    // 讀取URL參數並設置預設的host和port
    const host = window.location.hostname;
    const port = '6080';
    const password = 'kangs'; // 你的 VNC 密碼
    const path = 'websockify';

    // 構建 WebSocket URL 用來連接
    let url = window.location.protocol === 'https:' ? 'wss' : 'ws';
    url += `://${host}`;
    if (port) {
      url += `:${port}`;
    }
    url += `/${path}`;

    console.log('WebSocket URL: ', url);

    // 獲取 screen 元素並建立 RFB 物件
    const screenElement = document.getElementById('screen');
    if (screenElement) {
      this.rfb = new RFB(screenElement, url, {
        credentials: { password: password },
      });

      if (this.rfb) {
        console.log('RFB instance initialized successfully.');

        // 事件監聽
        this.rfb.addEventListener('connect', () => {
          console.log('Connected to VNC server.');
        });

        this.rfb.addEventListener('disconnect', (e: any) => {
          console.error('Disconnected from VNC server.', e.detail);
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
}
