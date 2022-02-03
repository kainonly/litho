import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { PasswordRule, toSortValues, TreeNodesExpanded, updateFormGroup } from '@weplanx/common';
import { NzTreeNode } from 'ng-zorro-antd/tree';

describe('测试助手', () => {
  it('updateFormGroup', () => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule]
    });
    const fb = TestBed.inject(FormBuilder);
    const f = fb.group({
      name: [null, Validators.required],
      meta: fb.group({
        phone: []
      })
    });
    updateFormGroup(Object.values(f.controls));
    expect(f.get('name')?.dirty).toBeTruthy();
    expect(f.get('name')?.status).toEqual('INVALID');
    expect(f.get('meta')?.get('phone')?.dirty).toBeTruthy();
    expect(f.get('meta')?.get('phone')?.status).toEqual('VALID');
  });

  it('toSortValues', () => {
    expect(toSortValues({ sort: '' })).toEqual([]);
    expect(toSortValues({ sort: 1 })).toEqual(['sort.1']);
    expect(toSortValues({ sort: 'ascend' })).toEqual(['sort.1']);
    expect(toSortValues({ sort: 'descend' })).toEqual(['sort.-1']);
  });

  it('TreeNodesExpanded', () => {
    const nodes = [
      new NzTreeNode({
        title: 'Root',
        key: 'root',
        children: [
          new NzTreeNode({
            title: 'Group A',
            key: 'group-a'
          }),
          new NzTreeNode({
            title: 'Group B',
            key: 'group-b',
            children: [
              new NzTreeNode({
                title: 'Sub 1',
                key: 'group-b-1'
              })
            ]
          })
        ]
      })
    ];
    TreeNodesExpanded(nodes, true);
    const stack = [...nodes];
    const list = [];
    while (stack.length !== 0) {
      const node = stack.pop();
      list.push(node);
      if (node?.children.length !== 0) {
        stack.push(...node!.children);
      }
    }
    expect(list.every(v => v!.isExpanded)).toBeTruthy();
  });

  it('PasswordRule', () => {
    expect(PasswordRule('abcd')).toEqual({ min: true, error: true });
    expect(PasswordRule('ABCDEFGHIGKLMN')).toEqual({ lowercase: true, error: true });
    expect(PasswordRule('abcdefghigklmn')).toEqual({ uppercase: true, error: true });
    expect(PasswordRule('Abcdefghigklmn')).toEqual({ number: true, error: true });
    expect(PasswordRule('Abcdefghigklmn123')).toEqual({ symbol: true, error: true });
    expect(PasswordRule('Abcdefghigklmn+123')).toBeNull();
  });
});
