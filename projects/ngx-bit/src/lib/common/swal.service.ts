import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Location} from '@angular/common';
import {Observable} from 'rxjs';
import Swal from 'sweetalert2';
import {BitService} from '../base/bit.service';
import {AlertCustomize} from '../types/alert-customize';

@Injectable()
export class SwalService {
  static native = Swal;

  constructor(private bit: BitService,
              private location: Location) {
  }

  addAlert(res: any, form: FormGroup, reset?: any, customize?: AlertCustomize): Observable<any> {
    return Observable.create((observer) => {
      if (!res.error) {
        Swal.fire({
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
            form.reset(reset ? reset : undefined);
            observer.next(true);
            observer.complete();
          } else {
            this.location.back();
            observer.next(false);
            observer.complete();
          }
        });
      } else {
        Swal.fire({
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

  editAlert(res: any, customize?: AlertCustomize): Observable<any> {
    return Observable.create((observer) => {
      if (!res.error) {
        Swal.fire({
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
            this.location.back();
            observer.next(false);
            observer.complete();
          }
        });
      } else {
        Swal.fire({
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

  deleteAlert(service: Observable<any>, customize?: AlertCustomize): Observable<any> {
    return Observable.create((observer) => {
      Swal.fire({
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
