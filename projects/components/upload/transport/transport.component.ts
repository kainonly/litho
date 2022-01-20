import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';

import { TransportDataSource } from './transport.data-source';

@Component({
  selector: 'wpx-upload-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.scss']
})
export class WpxUploadTransportComponent implements OnInit, AfterViewInit {
  @Input() action!: (files: NzUploadFile[]) => Observable<any>;
  @Output() readonly actionComplete: EventEmitter<string> = new EventEmitter();
  @ViewChild('messageContent') messageContent!: TemplateRef<any>;

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
        messageId = this.message.loading(this.messageContent, { nzDuration: 0 }).messageId;
      }
      if (status && messageId) {
        this.message.remove(messageId);
        messageId = undefined;
      }
    });
  }
}
