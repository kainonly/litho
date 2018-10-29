import { Injectable } from '@angular/core';
import { BitService } from '../bit.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable()
export class SwalService {
  constructor(private bit: BitService) {
  }

  addAlert(res: any, reset?: any): Observable<any> {
    return Observable.create(observer => {
      if (!res.error) {
        Swal({
          title: this.bit.l['operate_success'],
          text: this.bit.l['add_success_msg'],
          type: 'success',
          showCancelButton: true,
          confirmButtonText: this.bit.l['add_continue'],
          cancelButtonText: this.bit.l['operate_back']
        }).then(result => {
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
        Swal({
          title: this.bit.l['operate_error'],
          text: res.msg,
          type: 'error',
          confirmButtonText: this.bit.l['operate_ok']
        }).then(() => {
          observer.next(false);
          observer.complete();
        });
      }
    });
  }

  editAlert(res: any): Observable<any> {
    return Observable.create(observer => {
      if (!res.error) {
        Swal({
          title: this.bit.l['operate_success'],
          text: this.bit.l['edit_success_msg'],
          type: 'success',
          showCancelButton: true,
          confirmButtonText: this.bit.l['edit_continue'],
          cancelButtonText: this.bit.l['operate_back']
        }).then(result => {
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
        Swal({
          title: this.bit.l['operate_error'],
          text: res.msg,
          type: 'error',
          confirmButtonText: this.bit.l['operate_ok']
        }).then(() => {
          observer.next(false);
          observer.complete();
        });
      }
    });
  }

  deleteAlert(service: Observable<any>): Observable<any> {
    return Observable.create(observer => {
      Swal({
        title: this.bit.l['operate_warning'],
        text: this.bit.l['delete_warning'],
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: this.bit.l['delete_yes'],
        cancelButtonText: this.bit.l['delete_cancel']
      }).then(result => {
        if (result.value) {
          service.subscribe(res => {
            observer.next(res);
            observer.complete();
          });
        }
      });
    });
  }
}
