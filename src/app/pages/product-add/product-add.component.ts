import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BitSwalService, BitService } from 'ngx-bit';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { switchMap } from 'rxjs/operators';
import { ProductService } from '@api/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html'
})
export class ProductAddComponent implements OnInit {
  form: FormGroup;

  constructor(
    public bit: BitService,
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private swal: BitSwalService,
    private productService: ProductService
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
    this.productService.add(data).pipe(
      switchMap(res =>
        this.swal.addAlert(res, this.form, {
          status: true
        })
      )
    ).subscribe(() => {
    });
  }
}
