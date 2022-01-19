import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';

import { TransportDataSource } from './transport.data-source';

@Component({
  selector: 'wpx-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.scss']
})
export class WpxTransportComponent implements OnInit, AfterViewInit {
  @ViewChild('messageTpl') messageTpl!: TemplateRef<any>;
  @Input() action!: (files: NzUploadFile[]) => Observable<any>;
  @Output() readonly actionComplete: EventEmitter<string> = new EventEmitter();

  ds: TransportDataSource = new TransportDataSource();

  constructor(private message: NzMessageService) {}

  ngOnInit(): void {
    this.ds.complete.pipe(switchMap(files => this.action(files))).subscribe(v => {
      this.message.success('上传成功');
      this.actionComplete.emit(v);
    });
  }

  ngAfterViewInit(): void {
    let messageId: any;
    this.ds.done.subscribe(status => {
      if (!status && !messageId) {
        messageId = this.message.loading(this.messageTpl, {
          nzDuration: 0
        }).messageId;
      }
      if (status && messageId) {
        this.message.remove(messageId);
        messageId = undefined;
      }
    });
  }
}
