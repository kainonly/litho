import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BitService, BitEventsService, BitSwalService } from 'ngx-bit';
import { ActivatedRoute } from '@angular/router';
import { NzTreeNodeOptions } from 'ng-zorro-antd/core/tree/nz-tree-base-node';
import { ResourceService } from '@common/resource.service';
import { asyncValidator } from 'ngx-bit/operates';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-resource-add',
  templateUrl: './resource-add.component.html'
})
export class ResourceAddComponent implements OnInit, OnDestroy {
  form: FormGroup;
  parentId: number;
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
      if (params.parentId) {
        this.parentId = parseInt(params.parentId, 0);
      }
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
    return asyncValidator(this.resourceService.validedKey(control.value));
  };

  /**
   * 获取父级节点
   */
  getParentNodes() {
    this.resourceService.originLists().subscribe(data => {
      const refer: Map<string, NzTreeNodeOptions> = new Map();
      const lists = data.map(v => {
        if (this.parentId && v.id === this.parentId) {
          this.form.get('parent').setValue(v.key);
        }

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
    this.resourceService.add(data).pipe(
      switchMap(res => this.swal.addAlert(res, this.form, {
        nav: false,
        router: false,
        policy: false,
        status: true
      }))
    ).subscribe(status => {
      if (status) {
        this.getParentNodes();
      }
    });
  }
}
