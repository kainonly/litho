import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BitConfigService, BitService } from 'ngx-bit';
import { GalleryDataSource } from './gallery.data-source';
import { GalleryService } from '@common/gallery.service';
import { GalleryTypeService } from '@common/gallery-type.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalComponent, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzImageService } from 'ng-zorro-antd/image';
import { Clipboard } from '@angular/cdk/clipboard';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TransportDataSource } from './transport.data-source';
import { switchMap } from 'rxjs/operators';
import { UiSerivce } from '@common/ui.serivce';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, AfterViewInit {
  tds: TransportDataSource = new TransportDataSource();
  @ViewChild('transportMessageTpl') transportMessageTpl: TemplateRef<any>;

  ds: GalleryDataSource;
  typeLists: any[] = [];
  typeVisible = true;
  typeSort = true;
  typeName: string;
  editTypeData: any;

  @ViewChild('renameModal') renameModal: NzModalComponent;
  renameData: any;
  renameForm: FormGroup;

  constructor(
    public config: BitConfigService,
    public bit: BitService,
    public ui: UiSerivce,
    private galleryService: GalleryService,
    private galleryTypeService: GalleryTypeService,
    private clipboard: Clipboard,
    private modal: NzModalService,
    private notification: NzNotificationService,
    private message: NzMessageService,
    private image: NzImageService,
    private contextMenu: NzContextMenuService,
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
    this.tds.complete.pipe(
      switchMap(data => {
        return this.galleryService.bulkInsert({
          type_id: !this.ds.lists.search.type_id.value ? 0 : this.ds.lists.search.type_id.value,
          data: data.map(v => ({
            name: v.originFileObj.name,
            url: Reflect.get(v.originFileObj, 'key')
          }))
        });
      })
    ).subscribe(res => {
      if (res.error === 1) {
        this.message.error(this.bit.l.uploadError);
        return;
      }
      this.ds.fetchData(true);
      this.message.success(this.bit.l.uploadSuccess);
    });
  }

  ngAfterViewInit(): void {
    let messageId: string;
    this.tds.done.subscribe(status => {
      if (!status && !messageId) {
        messageId = this.message.loading(this.transportMessageTpl, {
          nzDuration: 0
        }).messageId;
      }
      if (status && messageId) {
        this.message.remove(messageId);
        messageId = undefined;
      }
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
    return `url(${this.bit.static}${url}?imageMogr2/thumbnail/200x/format/webp/interlace/1/quality/80`;
  }

  preview(data: any): void {
    this.image.preview([
      { src: this.bit.static + data.url }
    ]);
  }

  openTypeDrawer(): void {
    this.typeVisible = true;
  }

  closeTypeDrawer(): void {
    this.typeVisible = false;
    this.addTypeCancel();
    this.editTypeCancel();
  }

  addTypeCancel(): void {
    this.typeName = undefined;
  }

  addTypeSubmit(): void {
    if (!this.typeName) {
      return;
    }
    this.galleryTypeService.add({
      name: this.typeName
    }).subscribe(res => {
      if (!res.error) {
        this.addTypeCancel();
        this.getTypeLists();
        this.notification.success(this.bit.l.operateSuccess, this.bit.l.addSuccess);
      } else {
        this.notification.success(this.bit.l.operateError, this.bit.l.addFailed);
      }
    });
  }

  editType(data: any): void {
    this.editTypeData = Object.assign(data, {
      editName: data.name
    });
  }

  editTypeCell(data: any): boolean {
    return this.editTypeData && this.editTypeData.id === data.id && !this.typeSort;
  }

  editTypeCancel(): void {
    this.editTypeData = undefined;
  }

  editTypeSubmit(data: any): void {
    if (!data.editName) {
      return;
    }
    this.galleryTypeService.edit({
      id: data.id,
      name: data.editName
    }).subscribe(res => {
      if (!res.error) {
        data.name = data.editName;
        this.editTypeCancel();
        this.notification.success(this.bit.l.operateSuccess, this.bit.l.editSuccess);
      } else {
        this.notification.success(this.bit.l.operateError, this.bit.l.editFailed);
      }
    });
  }

  editTypeDelete(id: any[]): void {
    this.galleryTypeService.delete(id).subscribe(res => {
      if (!res.error) {
        this.getTypeLists();
        this.notification.success(
          this.bit.l.operateSuccess,
          this.bit.l.deleteSuccess
        );
      } else {
        this.notification.error(
          this.bit.l.operateError,
          this.bit.l.deleteError
        );
      }
    });
  }

  drop(event: CdkDragDrop<string[]>): void {
    console.log(event);
    moveItemInArray(this.typeLists, event.previousIndex, event.currentIndex);
    // this.sortSubmit();
  }

  openSortMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.contextMenu.create($event, menu);
  }

  sortMove(previousIndex: number, currentIndex: number): void {
    moveItemInArray(this.typeLists, previousIndex, currentIndex);
    this.sortSubmit();
  }

  private sortSubmit(): void {
    const data = this.typeLists.map((value, index) => {
      return {
        id: value.id,
        sort: index
      };
    });
    this.galleryTypeService.sort(data).subscribe(res => {
      console.log(res);
      if (!res.error) {
        this.getTypeLists();
        this.notification.success(
          this.bit.l.operateSuccess,
          this.bit.l.sortSuccess
        );
      } else {
        this.notification.error(
          this.bit.l.operateError,
          this.bit.l.sortError
        );
      }
    });
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
