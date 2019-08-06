import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Location} from '@angular/common';
import {Observable} from 'rxjs';
import Swal from 'sweetalert2';
import {AlertCustomize} from '../types/alert-customize';
import {BitService} from '../base/bit.service';

@Injectable()
export class SwalService {
  static native = Swal;

  constructor(
    private bit: BitService,
    private location: Location
  ) {
  }

  /**
   * Add a prompt to use the request
   */
  addAlert(res: any, form: FormGroup, reset?: any, customize?: AlertCustomize): Observable<any> {
    return new Observable(subscriber => {
      if (!res.error) {
        Swal.fire({
          title: this.bit.l.get('operateSuccess'),
          text: customize && customize.text ? customize.text : this.bit.l.get('addSuccessMsg'),
          type: 'success',
          showCancelButton: true,
          confirmButtonText:
            customize && customize.confirmButtonText
              ? customize.confirmButtonText
              : this.bit.l.get('addContinue'),
          cancelButtonText:
            customize && customize.cancelButtonText
              ? customize.cancelButtonText
              : this.bit.l.get('operateBack')
        }).then((result) => {
          if (result.value) {
            form.reset(reset ? reset : undefined);
            subscriber.next(true);
            subscriber.complete();
          } else {
            this.location.back();
            subscriber.next(false);
            subscriber.complete();
          }
        });
      } else {
        Swal.fire({
          title: this.bit.l.get('operateError'),
          text: customize && customize.errorText ? customize.errorText : res.msg,
          type: 'error',
          confirmButtonText: this.bit.l.get('operateOk')
        }).then(() => {
          subscriber.next(false);
          subscriber.complete();
        });
      }
    });
  }

  /**
   * Edit a prompt to use the request
   */
  editAlert(res: any, customize?: AlertCustomize): Observable<any> {
    return new Observable(subscriber => {
      if (!res.error) {
        Swal.fire({
          title: this.bit.l.get('operateSuccess'),
          text: customize && customize.text ? customize.text : this.bit.l.get('editSuccessMsg'),
          type: 'success',
          showCancelButton: true,
          confirmButtonText:
            customize && customize.confirmButtonText
              ? customize.confirmButtonText
              : this.bit.l.get('editContinue'),
          cancelButtonText:
            customize && customize.cancelButtonText
              ? customize.cancelButtonText
              : this.bit.l.get('operateBack')
        }).then((result) => {
          if (result.value) {
            subscriber.next(true);
            subscriber.complete();
          } else {
            this.location.back();
            subscriber.next(false);
            subscriber.complete();
          }
        });
      } else {
        Swal.fire({
          title: this.bit.l.get('operateError'),
          text: customize && customize.errorText ? customize.errorText : res.msg,
          type: 'error',
          confirmButtonText: this.bit.l.get('operateOk')
        }).then(() => {
          subscriber.next(false);
          subscriber.complete();
        });
      }
    });
  }

  /**
   * Delete a prompt to use the request
   */
  deleteAlert(service: Observable<any>, customize?: AlertCustomize): Observable<any> {
    return new Observable(subscriber => {
      Swal.fire({
        title: this.bit.l.get('operateWarning'),
        text: customize && customize.text ? customize.text : this.bit.l.get('deleteWarning'),
        type: 'warning',
        showCancelButton: true,
        confirmButtonText:
          customize && customize.confirmButtonText ? customize.confirmButtonText : this.bit.l.get('deleteYes'),
        cancelButtonText:
          customize && customize.cancelButtonText ? customize.cancelButtonText : this.bit.l.get('deleteCancel')
      }).then((result) => {
        if (result.value) {
          service.subscribe((res) => {
            subscriber.next(res);
            subscriber.complete();
          });
        }
      });
    });
  }
}
