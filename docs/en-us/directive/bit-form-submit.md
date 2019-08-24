## bitFormSubmit - Form Submit

#### @Directive({selector: '[bitFormSubmit]'})

```typescript
@Directive({
  selector: '[bitFormSubmit]'
})
export class BitFormSubmitDirective implements OnInit {
  @Output() bitFormSubmit: EventEmitter<any> = new EventEmitter();

  constructor(
    private form: FormGroupDirective
  ) {
  }

  ngOnInit() {
    this.form.ngSubmit.subscribe(_ => {
      const controls = this.form.control.controls;
      for (const key in controls) {
        if (controls.hasOwnProperty(key)) {
          controls[key].markAsDirty();
          controls[key].updateValueAndValidity();
        }
      }
      this.bitFormSubmit.emit(this.form.value);
    });
  }
}
```

- **@Output() bitFormSubmit: EventEmitter< any >** Listening form submission

Use in form

```html
<form nz-form [formGroup]="form" (bitFormSubmit)="submit($event)">
    ....
</form>
```

```typescript
form: FormGroup;

constructor(private fb: FormBuilder) {
}

this.form = this.fb.group({...});

submit(data) {...}
```