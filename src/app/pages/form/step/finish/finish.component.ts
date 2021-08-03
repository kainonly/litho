import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-form-step-finish',
  templateUrl: './finish.component.html'
})
export class FinishComponent implements OnInit {
  @Input() data!: any;
  @Output() readonly ok: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
    console.log(this.data);
  }

  again(): void {
    this.ok.emit();
  }
}
