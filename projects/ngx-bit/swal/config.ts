import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Config {
  /**
   * CDN 加载地址，默认 https://cdn.jsdelivr.net/npm/sweetalert2/dist/sweetalert2.all.min.js
   */
  url?: string;
}
