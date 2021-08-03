import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-advanced',
  templateUrl: './advanced.component.html',
  styleUrls: ['./advanced.component.scss']
})
export class AdvancedComponent implements OnInit, OnChanges {
  form!: FormGroup;
  editUser: Record<string, any> = {};

  constructor(private fb: FormBuilder) {}

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
        this.fb.group({
          name: ['John Brown', [Validators.required]],
          no: ['00001', [Validators.required]],
          department: ['New York No. 1 Lake Park', [Validators.required]]
        }),
        this.fb.group({
          name: ['Jim Green', [Validators.required]],
          no: ['00002', [Validators.required]],
          department: ['London No. 1 Lake Park', [Validators.required]]
        }),
        this.fb.group({
          name: ['Joe Black', [Validators.required]],
          no: ['00003', [Validators.required]],
          department: ['Sidney No. 1 Lake Park', [Validators.required]]
        })
      ])
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  openEditUser(index: number): void {
    const users: FormArray = this.form.get('users') as FormArray;
    this.editUser[index] = { ...users?.get([index])?.value };
  }

  cancelEditUser(index: number): void {
    delete this.editUser[index];
  }

  addUser(): void {
    const users: FormArray = this.form.get('users') as FormArray;
    users.push(this.fb.group({}));
  }

  submit(data: any): void {
    console.log(data);
  }
}
