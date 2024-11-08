import { Component } from '@angular/core';
import RFB from '@novnc/novnc/lib/rfb';
// 定義 SecurityFailureEvent 接口
interface SecurityFailureEvent {
  detail: {
    status: number;  // 狀態碼
    reason: string;  // 錯誤原因
  }
}
@Component({
  selector: 'app-vnctest3',
  standalone: true,
  imports: [],
  templateUrl: './vnctest3.component.html',
  styleUrl: './vnctest3.component.scss'
})
export class Vnctest3Component {
  title = "vnc-client";
  public rfb: InstanceType<typeof RFB> | null = null;  // 使用 'InstanceType<typeof RFB>' 類型
  private monitorInterval: any;

  startClient() {
    const host = "localhost";
    const port = "5901";
    const password = "kangs";
    let url = window.location.protocol === "https:" ? "wss" : "ws";
    url += "://" + host + (port ? ":" + port : "");

    const target = document.getElementById("screen") as HTMLCanvasElement;

    if (!target) {
      console.error("Cannot find 'screen' element.");
      return;
    }

    try {
      // 初始化 RFB 物件
      this.rfb = new RFB(target, url, { credentials: { password } });

      // 設置事件監聽器
      this.rfb.addEventListener('connect', () => {
        console.log('Connected to VNC server.');
      });

      this.rfb.addEventListener('disconnect', () => {
        console.log('Disconnected from VNC server.');
      });

      this.rfb.addEventListener('securityfailure', (e: SecurityFailureEvent) => {
        console.error('Security failure:', e.detail);
      });

      console.log("VNC connection attempt started.");
    } catch (error) {
      console.error("Failed to initialize VNC connection:", error);
      this.rfb = null; // 確保 rfb 在失敗時被設為 null
    }
  }

  monitorConnection() {
    if (!this.rfb) {
      console.error("No VNC connection established. Start the client first.");
      return;
    }

    this.monitorInterval = setInterval(() => {
      if (this.rfb) {
        // 檢查連接狀態
        console.log("Connection status:", this.rfb._rfb_connection_state || "Not initialized");
      } else {
        console.log("RFB object is not initialized.");
      }
    }, 1000); // 每秒檢查一次
  }

  stopMonitoring() {
    if (this.monitorInterval) {
      clearInterval(this.monitorInterval);
      console.log("Stopped monitoring.");
    }
  }

  disconnect() {
    if (this.rfb) {
      this.rfb.disconnect();
      console.log("Disconnected from VNC server.");
    } else {
      console.error("No active VNC connection to disconnect.");
    }
    this.stopMonitoring();
  }

  ngOnDestroy() {
    this.disconnect(); // 組件銷毀時斷開連接並停止監控
  }

}
