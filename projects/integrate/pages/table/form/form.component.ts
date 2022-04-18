import { Component, Input } from '@angular/core';

@Component({
  selector: 'wpx-pages-table-form',
  templateUrl: './form.component.html'
})
export class FormComponent {
  @Input() editable?: any;
}
