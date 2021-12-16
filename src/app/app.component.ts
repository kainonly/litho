import { Component, OnInit } from '@angular/core';

import { environment } from '@env';
import { WpxService } from '@weplanx/components';
import { NzCodeEditorService } from 'ng-zorro-antd/code-editor';
import { NzIconService } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-root',
  template: ` <router-outlet></router-outlet> `
})
export class AppComponent implements OnInit {
  constructor(private wpx: WpxService, private nzIconService: NzIconService, private codeEditor: NzCodeEditorService) {}

  ngOnInit() {
    this.wpx.setBaseUrl(environment.baseUrl);
    this.wpx.setAssets(environment.cdn);
    this.nzIconService.changeAssetsSource(environment.cdn);
  }
}
