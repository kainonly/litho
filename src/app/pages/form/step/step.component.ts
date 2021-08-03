import { Component } from '@angular/core';

@Component({
  selector: 'app-form-step',
  templateUrl: './step.component.html'
})
export class StepComponent {
  step = 0;
  data: any;

  next(value?: any): void {
    if (!!value) {
      this.data = value;
    }
    this.step += 1;
  }

  reset(): void {
    this.step = 0;
  }
}
