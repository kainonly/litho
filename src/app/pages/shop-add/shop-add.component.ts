import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BitSwalService, BitService } from 'ngx-bit';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { switchMap } from 'rxjs/operators';
import { ShopService } from '@api/shop.service';

@Component({
  selector: 'app-shop-add',
  templateUrl: './shop-add.component.html'
})
export class ShopAddComponent implements OnInit {
  form: FormGroup;

  constructor(
    public bit: BitService,
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private swal: BitSwalService,
    private shopService: ShopService
  ) {
  }

  ngOnInit(): void {
    this.bit.registerLocales(import('./language'));
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      status: [true, [Validators.required]]
    });
  }


  /**
   * 提交
   */
  submit(data): void {
    this.shopService.add(data).pipe(
      switchMap(res =>
        this.swal.addAlert(res, this.form, {
          status: true
        })
      )
    ).subscribe(() => {
    });
  }
}
