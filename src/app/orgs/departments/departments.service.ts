import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AnyDto, WpxApi } from '@weplanx/ng';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { Department, DepartmentNode } from './types';

@Injectable()
export class DepartmentsService extends WpxApi<Department> {
  protected override collection = 'departments';
  /**
   * 字典
   */
  dict: Record<string, AnyDto<Department>> = {};

  /**
   * 获取树视图节点
   */
  getNodes(): Observable<DepartmentNode[]> {
    return this.find({}, { sort: { sort: 1 } }).pipe(
      map(v => {
        const nodes: DepartmentNode[] = [];
        const dict: Record<string, DepartmentNode> = {};
        for (const x of v) {
          this.dict[x._id] = x;
          dict[x._id] = x;
        }
        for (const x of v) {
          const options = dict[x._id];
          if (!x.parent) {
            nodes.push(options);
          } else {
            if (dict.hasOwnProperty(x.parent)) {
              if (!dict[x.parent].hasOwnProperty('children')) {
                dict[x.parent].children = [];
              }
              dict[x.parent].children?.push(options);
            }
          }
        }
        return nodes;
      })
    );
  }

  /**
   * 获取 NzTreeNodeOptions
   */
  getNzTreeNodeOptions(): Observable<NzTreeNodeOptions[]> {
    return this.find({}, { sort: { sort: 1 } }).pipe(
      map(v => {
        const nodes: NzTreeNodeOptions[] = [];
        const dict: Record<string, NzTreeNodeOptions> = {};
        for (const x of v) {
          dict[x._id] = {
            title: `${x.name}`,
            key: x._id,
            parent: x.parent,
            isLeaf: true,
            expanded: true,
            selectable: true,
            description: x.description
          };
        }
        for (const x of v) {
          const options = dict[x._id];
          if (!x.parent) {
            nodes.push(options);
          } else {
            if (dict.hasOwnProperty(x.parent)) {
              if (!dict[x.parent].hasOwnProperty('children')) {
                dict[x.parent].children = [];
              }
              dict[x.parent].children?.push(options);
              dict[x.parent].isLeaf = false;
            }
          }
        }
        return nodes;
      })
    );
  }

  /**
   * 关系重组
   * @param id
   * @param parent
   */
  reorganization(id: string, parent: string): Observable<any> {
    return this.updateById(
      id,
      {
        $set: {
          parent: parent === 'root' ? null : parent
        }
      },
      {
        xdata: {
          parent: 'oid'
        }
      }
    );
  }
}
