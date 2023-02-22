import { Component } from '@angular/core';

@Component({
  selector: 'app-work-task',
  templateUrl: './task.component.html'
})
export class TaskComponent {
  options = ['列表', '看板'];
  items: any[] = [];
}
