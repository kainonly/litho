import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AnyDto, WpxApi } from '@weplanx/ng';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { Department } from './types';

@Injectable()
export class DepartmentsService extends WpxApi<Department> {
  protected override collection = 'departments';
  dict: Record<string, AnyDto<Department>> = {};

  /**
   * 获取树节点
   */
  getTreeNode(selectable = false, root: string | null = 'root'): Observable<NzTreeNodeOptions[]> {
    return this.find({}, { sort: { sort: 1 } }).pipe(
      map(v => {
        const nodes: NzTreeNodeOptions[] = [];
        const dict: Record<string, NzTreeNodeOptions> = {};
        for (const x of v) {
          this.dict[x._id] = x;
          dict[x._id] = {
            title: `${x.name}`,
            key: x._id,
            parent: x.parent ?? root,
            isLeaf: true,
            expanded: true,
            selectable: selectable,
            description: x.description
          };
        }
        for (const x of v) {
          const options = dict[x._id];
          if (!x.parent) {
            nodes.push(options);
          } else {
            const parent = x.parent ?? root;
            if (dict.hasOwnProperty(parent)) {
              if (!dict[parent].hasOwnProperty('children')) {
                dict[parent].children = [];
              }
              dict[parent].children!.push(options);
              dict[parent].isLeaf = false;
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
