import { Component } from '@angular/core';

@Component({
  selector: 'wpx-admin-functions-office',
  templateUrl: './office.component.html'
})
export class OfficeComponent {
  functions: any[] = [{ name: '第三方免登陆', status: true }];
}
