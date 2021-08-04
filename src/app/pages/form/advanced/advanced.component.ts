import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NzMessageService } from 'ng-zorro-antd/message';

import { User } from './user';

@Component({
  selector: 'app-form-advanced',
  templateUrl: './advanced.component.html',
  styleUrls: ['./advanced.component.scss']
})
export class AdvancedComponent implements OnInit {
  form!: FormGroup;
  userForm: Record<string, any> = {};

  constructor(private fb: FormBuilder, private message: NzMessageService) {}

  ngOnInit() {
    this.form = this.fb.group({
      warehouse: this.fb.group({
        name: [null, [Validators.required]],
        url: [null, [Validators.required]],
        admin: [null, [Validators.required]],
        approver: [null, [Validators.required]],
        effective: [null, [Validators.required]],
        type: [null, [Validators.required]]
      }),
      task: this.fb.group({
        name: [null, [Validators.required]],
        description: [null, [Validators.required]],
        executor: [null, [Validators.required]],
        responsible: [null, [Validators.required]],
        effective: [null, [Validators.required]],
        type: [null, [Validators.required]]
      }),
      users: this.fb.array([
        this.createUser({
          name: 'John Brown',
          employee_id: '00001',
          department: 'New York No. 1 Lake Park'
        }),
        this.createUser({
          name: 'Jim Green',
          employee_id: '00002',
          department: 'London No. 1 Lake Park'
        }),
        this.createUser({
          name: 'Joe Black',
          employee_id: '00003',
          department: 'Sidney No. 1 Lake Park'
        })
      ])
    });
  }

  createUser(user: User): FormGroup {
    const form = this.fb.group({
      name: [null, [Validators.required]],
      employee_id: [null, [Validators.required]],
      department: [null, [Validators.required]]
    });
    form.patchValue(user);
    return form;
  }

  openEditUser(index: number): void {
    if (Object.keys(this.userForm).length !== 0) {
      this.message.warning('只能同时编辑一行');
      return;
    }
    const user: User = this.form.get('users')?.get([index])?.value as User;
    this.userForm[user.employee_id] = this.createUser({ ...user });
  }

  cancelEditUser(id: number): void {
    delete this.userForm[id];
  }

  openAddUser(): void {
    if (Object.keys(this.userForm).length !== 0) {
      this.message.warning('只能同时编辑一行');
      return;
    }
    this.userForm[0] = this.createUser({
      name: '',
      employee_id: '',
      department: ''
    });
  }

  cancelAddUser(): void {
    delete this.userForm[0];
  }

  addUser(): void {
    const users: FormArray = this.form.get('users') as FormArray;
    users.push(this.userForm[0]);
    this.cancelAddUser();
  }

  updateUser(index: number, user: Record<string, any>): void {
    this.form.get('users')?.get([index])?.patchValue(user);
    this.cancelEditUser(user.employee_id);
  }

  deleteUser(index: number): void {
    const users: FormArray = this.form.get('users') as FormArray;
    users.removeAt(index);
  }

  submit(data: any): void {
    console.log(data);
  }
}
