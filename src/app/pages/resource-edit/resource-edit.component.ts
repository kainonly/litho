import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BitService, BitEventsService, BitSwalService } from 'ngx-bit';
import { ActivatedRoute } from '@angular/router';
import { NzTreeNodeOptions } from 'ng-zorro-antd/core/tree/nz-tree-base-node';
import { ResourceService } from '@common/resource.service';
import { asyncValidator } from 'ngx-bit/operates';
import { switchMap } from 'rxjs/operators';
import { AsyncSubject } from 'rxjs';

@Component({
  selector: 'app-resource-edit',
  templateUrl: './resource-edit.component.html'
})
export class ResourceEditComponent implements OnInit, OnDestroy {
  private id: number;
  private keyAsync: AsyncSubject<string> = new AsyncSubject();
  form: FormGroup;
  parentLists: any[] = [];

  constructor(
    public bit: BitService,
    private fb: FormBuilder,
    private events: BitEventsService,
    private swal: BitSwalService,
    private route: ActivatedRoute,
    private resourceService: ResourceService
  ) {
  }

  ngOnInit() {
    this.bit.registerLocales(import('./language'));
    this.form = this.fb.group({
      name: this.fb.group(this.bit.i18nGroup({
        validate: {
          zh_cn: [Validators.required],
          en_us: []
        }
      })),
      key: [null, [Validators.required], [this.existsKey]],
      parent: [null, [Validators.required]],
      nav: [false, [Validators.required]],
      router: [false, [Validators.required]],
      policy: [false, [Validators.required]],
      icon: [null],
      status: [true, [Validators.required]]
    });
    this.route.params.subscribe(params => {
      this.id = parseInt(params.id, 0);
      this.getData();
      this.getParentNodes();
    });
    this.events.on('locale').subscribe(() => {
      this.getParentNodes();
    });
  }

  ngOnDestroy(): void {
    this.events.off('locale');
  }

  existsKey = (control: AbstractControl) => {
    return asyncValidator(this.resourceService.validedKey(control.value, this.keyAsync));
  };

  /**
   * 获取数据
   */
  getData() {
    this.resourceService.get(this.id).subscribe(data => {
      if (!data) {
        return;
      }
      this.keyAsync.next(data.key);
      this.keyAsync.complete();
      this.form.setValue({
        name: JSON.parse(data.name),
        key: data.key,
        parent: data.parent,
        nav: data.nav,
        router: data.router,
        policy: data.policy,
        icon: data.icon,
        status: data.status
      });
    });
  }

  /**
   * 获取父级节点
   */
  getParentNodes() {
    this.resourceService.originLists().subscribe(data => {
      const refer: Map<string, NzTreeNodeOptions> = new Map();
      const lists = data.map(v => {
        const rows = {
          title: JSON.parse(v.name)[this.bit.locale] + ' [' + v.key + ']',
          key: v.key,
          id: v.id,
          parent: v.parent,
          children: [],
          isLeaf: true
        };
        refer.set(v.key, rows);
        return rows;
      });
      const nodes: any[] = [{
        key: 'origin',
        title: {
          zh_cn: '最高级',
          en_us: 'Top'
        }[this.bit.locale],
        isLeaf: true
      }];
      for (const x of lists) {
        if (x.parent === 'origin') {
          nodes.push(refer.get(x.key));
        } else {
          const parent = x.parent;
          if (refer.has(parent)) {
            const rows = refer.get(parent);
            rows.isLeaf = false;
            rows.children.push(x);
            refer.set(parent, rows);
          }
        }
      }
      this.parentLists = nodes;
    });
  }

  submit(data) {
    Reflect.set(data, 'id', this.id);
    this.resourceService.edit(data).pipe(
      switchMap(res => this.swal.editAlert(res))
    ).subscribe(status => {
      if (status) {
        this.getParentNodes();
      }
      this.events.publish('refresh-menu');
    });
  };
}
