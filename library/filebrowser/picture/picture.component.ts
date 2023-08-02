/// <reference types="cropperjs" />

import { AfterViewInit, Component, ElementRef, Inject, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Any, AnyDto, WpxImageInfo, WpxApi, WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

import { WpxPicture } from '../types';

@Component({
  selector: 'wpx-filebrowser-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css']
})
export class PictureComponent implements OnInit, AfterViewInit {
  @ViewChild('painting') painting!: ElementRef;
  original?: WpxImageInfo;
  output?: WpxImageInfo;

  form!: FormGroup;
  query?: string;

  private cropper!: Cropper;
  private locked = false;

  constructor(
    @Inject(NZ_MODAL_DATA)
    public data: {
      doc: AnyDto<WpxPicture>;
      api: WpxApi<WpxPicture>;
    },
    private modalRef: NzModalRef,
    private wpx: WpxService,
    private message: NzMessageService,
    private fb: FormBuilder,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      mode: [0],
      cut: this.fb.group({ x: [], y: [], w: [], h: [] }),
      zoom: this.fb.group({ w: [], h: [] })
    });
    this.getOriginalInfo();
    this.getOutputInfo();
    this.query = this.data.doc.query;
    this.form.patchValue({ ...this.data.doc.process });
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.cropper = new Cropper(this.painting!.nativeElement, {
        autoCrop: false,
        movable: false,
        zoomable: false,
        ready: (_: Cropper.ReadyEvent<HTMLImageElement>) => {
          if (![1, 3].includes(this.mode.value)) {
            this.cropper.disable();
          } else {
            this.updateCrop();
          }
        },
        cropend: (_: Cropper.CropEndEvent<HTMLImageElement>) => {
          this.zone.run(() => {
            this.locked = true;
            const data = this.cropper.getData();
            this.form.get('cut')?.setValue({
              w: Math.trunc(data.width),
              h: Math.trunc(data.height),
              x: data.x < 0 ? 0 : Math.trunc(data.x),
              y: Math.trunc(data.y)
            });
            this.locked = false;
          });
        }
      });
    });
  }

  get mode(): FormControl {
    return this.form!.get('mode') as FormControl;
  }

  getOriginalInfo(): void {
    this.wpx.cosImageInfo(`/${this.data.doc.url}.image`).subscribe(data => {
      this.original = data;
    });
  }

  getOutputInfo(): void {
    this.wpx.cosImageInfo(`/${this.data.doc.url}`).subscribe(data => {
      this.output = data;
    });
  }

  watchMode(v: number): void {
    if (![1, 3].includes(v)) {
      this.cropper.clear();
      this.cropper.disable();
    } else {
      this.cropper.enable();
      const cut = this.form.get('cut')!.value;
      if (cut.w || cut.h) {
        this.cropper.crop().setData({
          width: cut.w,
          height: cut.h,
          x: cut.x,
          y: cut.y,
          scaleX: 1,
          scaleY: 1,
          rotate: 0
        });
      }
    }
  }

  updateCrop(): void {
    if (this.locked) {
      return;
    }
    const cut = this.form.get('cut')!.value;
    if (cut.w || cut.h) {
      this.cropper.crop().setData({
        width: cut.w,
        height: cut.h,
        x: cut.x,
        y: cut.y,
        scaleX: 1,
        scaleY: 1,
        rotate: 0
      });
    }
  }

  updateQuery(): void {
    const styles: string[] = ['imageMogr2'];
    const v = this.form.value;
    switch (v.mode) {
      case 1:
        styles.push(...this.cut(v.cut));
        break;
      case 2:
        styles.push(...this.thumbnail(v.zoom));
        break;
      case 3:
        styles.push(...this.cut(v.cut), ...this.thumbnail(v.zoom));
        break;
    }
    this.query = styles.join('/');
  }

  cut(v: Record<string, number>): string[] {
    return ['cut', `${v['w']}x${v['h']}x${v['x']}x${v['y']}`];
  }

  thumbnail(v: Record<string, number>): string[] {
    if (v['w'] || v['h']) {
      return ['thumbnail', `${v['w'] ?? ''}x${v['h'] ?? ''}`];
    }
    return [];
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(process: Any): void {
    this.updateQuery();
    this.data.api
      .updateById(this.data.doc._id, {
        $set: {
          query: this.query,
          process
        }
      })
      .subscribe(() => {
        this.data.doc.query = this.query;
        this.data.doc.process = process;
        this.message.success(`数据更新成功`);
        this.modalRef.triggerOk();
      });
  }
}
