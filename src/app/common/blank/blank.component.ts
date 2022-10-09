import { Component } from '@angular/core';

@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.scss']
})
export class BlankComponent {
  /**
   * 当前日期
   */
  year = new Date().getFullYear();
}
