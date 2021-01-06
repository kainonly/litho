import { Component, OnInit, ViewChild } from '@angular/core';
import { BitConfigService, BitService } from 'ngx-bit';
import { GalleryDataSource } from './gallery.data-source';
import { GalleryService } from '@common/gallery.service';
import { GalleryTypeService } from '@common/gallery-type.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalComponent, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzImageService } from 'ng-zorro-antd/image';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html'
})
export class GalleryComponent implements OnInit {
  ds: GalleryDataSource;
  typeLists: any[] = [];

  @ViewChild('renameModal') renameModal: NzModalComponent;
  renameData: any;
  renameForm: FormGroup;

  constructor(
    public config: BitConfigService,
    public bit: BitService,
    private galleryService: GalleryService,
    private galleryTypeService: GalleryTypeService,
    private clipboard: Clipboard,
    private modal: NzModalService,
    private notification: NzNotificationService,
    private image: NzImageService,
    private fb: FormBuilder
  ) {
    this.ds = new GalleryDataSource(galleryService, 1);
  }

  ngOnInit(): void {
    this.bit.registerLocales(import('./language'));
    this.ds.lists = this.bit.listByPage({
      id: 'gallery',
      query: [
        { field: 'name', op: 'like', value: '' },
        { field: 'type_id', op: '=', value: '' }
      ],
      limit: 50
    });
    this.ds.lists.ready.subscribe(() => {
      this.getTypeLists();
    });
  }

  getTypeLists(): void {
    this.galleryTypeService.originLists().subscribe(data => {
      this.typeLists = data;
      this.ds.done();
    });
  }

  checkedAllBind(event: any): void {
    const target: Element = event.target;
    if (target.tagName.toLowerCase() === 'button') {
      this.ds.lists.checked = !this.ds.lists.checked;
      this.ds.lists.checkedAll(this.ds.lists.checked);
    }
  }

  thumb(url: string): string {
    return `url(${this.bit.static}${url}`;
  }

  preview(data: any): void {
    this.image.preview([
      { src: this.bit.static + data.litpic }
    ]);
  }

  openRenameModal(data: any): void {
    this.renameModal.open();
    this.renameData = data;
    this.renameForm = this.fb.group({
      id: [this.renameData.id],
      type_id: [this.renameData.type_id],
      name: [null, [Validators.required]],
      url: [this.renameData.url]
    });
  }

  closeRenameModal(): void {
    this.renameModal.close();
    this.renameData = undefined;
    this.renameForm = undefined;
  }

  submitRename(): void {
    const controls = this.renameForm.controls;
    for (const key in controls) {
      if (controls.hasOwnProperty(key)) {
        controls[key].markAsDirty();
        controls[key].updateValueAndValidity();
      }
    }
    this.galleryService.edit(this.renameForm.value).subscribe(res => {
      if (!res.error) {
        this.notification.success(
          this.bit.l.operateSuccess,
          this.bit.l.editSuccess
        );
        this.renameData.name = this.renameForm.value.name;
        this.closeRenameModal();
      } else {
        this.notification.error(
          this.bit.l.operateError,
          this.bit.l.editFailed
        );
      }
    });
  }

  copy(data: any): void {
    data.copied = this.clipboard.copy(this.bit.static + data.litpic);
    setTimeout(() => {
      data.copied = false;
    }, 1000);
  }

  delete(id: any[]): void {
    this.modal.confirm({
      nzTitle: this.bit.l.operateWarning,
      nzContent: this.bit.l.deleteWarning,
      nzOkText: this.bit.l.deleteYes,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.galleryService.delete(id).subscribe(res => {
          if (!res.error) {
            this.notification.success(
              this.bit.l.operateSuccess,
              this.bit.l.deleteSuccess
            );
            this.ds.delete(id);
          } else {
            this.notification.error(
              this.bit.l.operateError,
              this.bit.l.deleteError
            );
          }
        });
      },
      nzCancelText: this.bit.l.deleteCancel
    });
  }
}
