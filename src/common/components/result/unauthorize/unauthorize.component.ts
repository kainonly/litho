import { Component } from '@angular/core';

@Component({
  selector: 'app-result-unauthorize',
  template: `
    <nz-result
      nzStatus="403"
      nzTitle="403"
      nzSubTitle="Sorry, you have not linked your Lark account yet. Please contact the administrator to set up relevant enterprise collaboration."
    >
      <div nz-result-extra>
        <button nz-button nzType="primary" routerLink="/login">Go Back Login</button>
      </div>
    </nz-result>
  `
})
export class UnauthorizeComponent {}
