import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BitSwalService, BitService } from 'ngx-bit';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { switchMap } from 'rxjs/operators';
import { ShopService } from '@api/shop.service';
import { ActivatedRoute } from '@angular/router';
import { asyncValidator } from 'ngx-bit/operates';

@Component({
  selector: 'app-shop-edit',
  templateUrl: './shop-edit.component.html'
})
export class ShopEditComponent implements OnInit {
  private id: number;
  form: FormGroup;

  constructor(
    public bit: BitService,
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private swal: BitSwalService,
    private route: ActivatedRoute,
    private shopService: ShopService
  ) {
  }

  ngOnInit(): void {
    this.bit.registerLocales(import('./language'));
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      status: [true, [Validators.required]]
    });
    this.route.params.subscribe(param => {
      this.id = param.id;
      this.getData();
    });
  }

  getData(): void {
    this.shopService.get(this.id).subscribe(data => {
      this.form.patchValue({
        name: data.name,
        status: data.status
      });
    });
  }

  /**
   * 提交
   */
  submit(data): void {
    Reflect.set(data, 'id', this.id);
    this.shopService.edit(data).pipe(
      switchMap(res => this.swal.editAlert(res))
    ).subscribe(status => {
      if (status) {
        this.getData();
      }
    });
  }
}
