import { Component } from '@angular/core';

import { JoinedEditorOptions } from 'ng-zorro-antd/code-editor/typings';

@Component({
  selector: 'app-admin-pages-validator',
  templateUrl: './validator.component.html'
})
export class ValidatorComponent {
  option: JoinedEditorOptions = {
    language: 'json'
  };
}
