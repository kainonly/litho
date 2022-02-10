import { Component, OnInit } from '@angular/core';

import { environment } from '@env';
import { WpxService } from '@weplanx/common';
import { WpxRichtextService } from '@weplanx/components/richtext';
import { NzIconService } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(private wpx: WpxService, private nzIconService: NzIconService, private richtext: WpxRichtextService) {}

  ngOnInit(): void {
    this.wpx.setAssets(environment.cdn);
    this.wpx.setUpload({
      url: environment.upload.url,
      presignedUrl: environment.upload.presignedUrl,
      size: environment.upload.size
    });
    this.nzIconService.changeAssetsSource(environment.cdn);
    this.richtext.setup(environment.editorjs.url, environment.editorjs.plugins, (windowAny: any) => ({
      tools: {
        paragraph: {
          class: windowAny.Paragraph,
          inlineToolbar: true
        },
        header: windowAny.Header,
        table: windowAny.Table,
        delimiter: windowAny.Delimiter,
        underline: windowAny.Underline,
        list: {
          class: windowAny.NestedList,
          inlineToolbar: true
        },
        checklist: {
          class: windowAny.Checklist,
          inlineToolbar: true
        }
      }
    }));
  }
}
