import * as Swal from 'sweetalert2';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BitService} from '../base/bit.service';
import {AlertCustomize} from '../types/alert-customize';

@Injectable()
export class SwalService {
  static native = Swal;

  constructor(private bit: BitService) {
  }

  /**
   * 新增反馈栏
   */
  addAlert(res: any, reset?: any, customize?: AlertCustomize): Observable<any> {
    return Observable.create((observer) => {
      if (!res.error) {
        // @ts-ignore
        Swal({
          title: this.bit.l.operate_success,
          text: customize && customize.text ? customize.text : this.bit.l.add_success_msg,
          type: 'success',
          showCancelButton: true,
          confirmButtonText:
            customize && customize.confirmButtonText
              ? customize.confirmButtonText
              : this.bit.l.add_continue,
          cancelButtonText:
            customize && customize.cancelButtonText
              ? customize.cancelButtonText
              : this.bit.l.operate_back
        }).then((result) => {
          if (result.value) {
            if (reset) {
              this.bit.form.reset(reset);
            } else {
              this.bit.form.reset();
            }
            observer.next(true);
            observer.complete();
          } else {
            this.bit.back();
            observer.next(false);
            observer.complete();
          }
        });
      } else {
        // @ts-ignore
        Swal({
          title: this.bit.l.operate_error,
          text: customize && customize.error_text ? customize.error_text : res.msg,
          type: 'error',
          confirmButtonText: this.bit.l.operate_ok
        }).then(() => {
          observer.next(false);
          observer.complete();
        });
      }
    });
  }

  /**
   * 编辑反馈栏
   */
  editAlert(res: any, customize?: AlertCustomize): Observable<any> {
    return Observable.create((observer) => {
      if (!res.error) {
        // @ts-ignore
        Swal({
          title: this.bit.l.operate_success,
          text: customize && customize.text ? customize.text : this.bit.l.edit_success_msg,
          type: 'success',
          showCancelButton: true,
          confirmButtonText:
            customize && customize.confirmButtonText
              ? customize.confirmButtonText
              : this.bit.l.edit_continue,
          cancelButtonText:
            customize && customize.cancelButtonText
              ? customize.cancelButtonText
              : this.bit.l.operate_back
        }).then((result) => {
          if (result.value) {
            observer.next(true);
            observer.complete();
          } else {
            this.bit.back();
            observer.next(false);
            observer.complete();
          }
        });
      } else {
        // @ts-ignore
        Swal({
          title: this.bit.l.operate_error,
          text: customize && customize.error_text ? customize.error_text : res.msg,
          type: 'error',
          confirmButtonText: this.bit.l.operate_ok
        }).then(() => {
          observer.next(false);
          observer.complete();
        });
      }
    });
  }

  /**
   * 删除反馈栏
   */
  deleteAlert(service: Observable<any>, customize?: AlertCustomize): Observable<any> {
    return Observable.create((observer) => {
      // @ts-ignore
      Swal({
        title: this.bit.l.operate_warning,
        text: customize && customize.text ? customize.text : this.bit.l.delete_warning,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText:
          customize && customize.confirmButtonText ? customize.confirmButtonText : this.bit.l.delete_yes,
        cancelButtonText:
          customize && customize.cancelButtonText ? customize.cancelButtonText : this.bit.l.delete_cancel
      }).then((result) => {
        if (result.value) {
          service.subscribe((res) => {
            observer.next(res);
            observer.complete();
          });
        }
      });
    });
  }
}
