import { Component } from "@angular/core";
import RFB from '@novnc/novnc/lib/rfb';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true
})
export class AppComponent {
  title = "vnc-client";
  public rfb: any;  // 改為 'any' 類型以避免類型錯誤

  startClient() {
    console.log("Starting !!!");

    // 設定 VNC 伺服器參數
    const host = "localhost";
    const port = "5901";
    const password = "kangs"; // VNC 伺服器密碼

    // 建立 WebSocket URL
    let url = window.location.protocol === "https:" ? "wss" : "ws";
    url += "://" + host;
    if (port) {
      url += ":" + port;
    }

    console.log("WebSocket URL: ", url);

    // 獲取 canvas 元素作為目標顯示區域
    const target = document.getElementById("screen") as HTMLCanvasElement;
    if (!target) {
      console.error("找不到 screen 元素，請檢查 HTML 標籤是否正確");
      return;
    }

    // 建立 RFB 連接
    try {
      this.rfb = new RFB(target, url, {
        credentials: { password: password },
      });
      console.log("VNC 連接已建立");
    } catch (error) {
      console.error("VNC 連接失敗:", error);
    }
  }
}
