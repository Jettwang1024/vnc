import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import RFB from '@novnc/novnc/lib/rfb';

@Component({
  selector: 'app-vnctest1',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './vnctest1.component.html',
  styleUrls: ['./vnctest1.component.scss'],
})
export class Vnctest1Component {
  public connections: any[] = [];
  public connected = false;
  private rfbs: { [key: number]: InstanceType<typeof RFB> | null } = {};
  public screenDimensions: { [key: number]: { width: number, height: number } } = {};
  public scaleFactor = 1; // 初始縮放比例
  
  @HostListener('window:resize', ['$event'])
  onResize() {
    // 當窗口大小更改時動態更新縮放比例
    this.updateScaleFactor();
  }

  addConnection() {
    this.connections.push({
      host: '10.60.8.65',
      port: '5900',
      password: 'kangs',
      path: 'websockify',
      viewOnly: false,
      trueColor: true,
    });
  }

  disconnectClient(index: number) {
    if (this.rfbs[index]) {
      this.rfbs[index].disconnect();
      this.rfbs[index] = null;
      this.connected = false;
      console.log(`Disconnected from VNC server (connection ${index}).`);
    } else {
      console.log('No active connection to disconnect.');
    }
  }

  removeConnection(index: number) {
    this.disconnectClient(index);
    this.connections.splice(index, 1);
  }

  startClient(connection: any, index: number) {
    console.log(`Connecting to host: ${connection.host}, port: ${connection.port}, path: ${connection.path}`);
    
    fetch(`http://localhost:3000/connect?host=${connection.host}&port=${connection.port}`, {
      method: 'POST'
    })
    .then(response => response.text())
    .then(data => {
      console.log(data);

      const url = `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://localhost:6080/${connection.path}`;
      const screenElement = document.getElementById(`vnc-screen-${index}`) as HTMLElement;

      if (screenElement) {
        screenElement.innerHTML = '';

        this.rfbs[index] = new RFB(screenElement, url, {
          credentials: { password: connection.password },
          shared: true,
          view_only: connection.viewOnly,
          true_color: connection.trueColor,
        });

        // 監聽解析度變更事件，並自動更新顯示區域和縮放比例
        this.rfbs[index].addEventListener('desktopresize', (event: any) => {
          const { width, height } = event.detail;
          console.log(`Remote desktop resolution: ${width}x${height}`);
          this.screenDimensions[index] = { width, height };
          this.updateScaleFactor();
        });

        this.rfbs[index].addEventListener('connect', () => {
          console.log(`Connected to VNC server (connection ${index}).`);
          this.connected = true;
        });

        this.rfbs[index].addEventListener('disconnect', () => {
          console.log(`Disconnected from VNC server (connection ${index}).`);
          this.connected = false;
        });

        this.rfbs[index].addEventListener('securityfailure', (e: any) => {
          console.error(`Security failure on connection ${index}:`, e.detail.reason);
        });
      } else {
        console.error(`Cannot find "vnc-screen-${index}" element.`);
      }
    })
    .catch(error => {
      console.error('Error connecting to proxy server:', error);
    });
  }

  // 動態更新縮放比例，確保顯示區域適配窗口且不會遮擋按鈕
  updateScaleFactor() {
    for (const key in this.screenDimensions) {
      if (this.screenDimensions.hasOwnProperty(key)) {
        const { width, height } = this.screenDimensions[key];
        const availableWidth = window.innerWidth - 40; // 邊距調整，避免滾動條
        const availableHeight = window.innerHeight - 280; // 調整以包含標題和按鈕
  
        // 計算縮放比例以適應窗口
        this.scaleFactor = Math.min(availableWidth / width, availableHeight / height);
      }
    }
  }
}
