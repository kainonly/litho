import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { TransportDataSource } from './transport.data-source';
import { BitService } from 'ngx-bit';
import { switchMap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable } from 'rxjs';

@Component({
  selector: 'bit-transport',
  templateUrl: './bit-transport.component.html',
  styleUrls: ['./bit-transport.component.scss']
})
export class BitTransportComponent implements OnInit, AfterViewInit {
  ds: TransportDataSource = new TransportDataSource();

  @ViewChild('messageTpl') messageTpl: TemplateRef<any>;
  @Input() action: (files: NzUploadFile[]) => Observable<any>;
  @Output() actionComplete: EventEmitter<string> = new EventEmitter();

  constructor(
    public bit: BitService,
    private message: NzMessageService
  ) {
  }

  ngOnInit(): void {
    this.ds.complete.pipe(
      switchMap(files => this.action(files))
    ).subscribe(res => {
      if (res.error === 1) {
        this.message.error(this.bit.l.uploadError);
        return;
      }
      this.message.success(this.bit.l.uploadSuccess);
      this.actionComplete.emit(res);
    });
  }

  ngAfterViewInit(): void {
    let messageId: string;
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
