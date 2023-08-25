import { Component, Input, OnInit } from '@angular/core';

import { Schedule } from '@common/models/schedule';
import { SchedulesService } from '@common/services/schedules.service';
import { AnyDto } from '@weplanx/ng';

export interface KeysData {
  doc: AnyDto<Schedule>;
}

@Component({
  selector: 'app-admin-workflows-schedules-keys',
  templateUrl: './keys.component.html'
})
export class KeysComponent implements OnInit {
  @Input({ required: true }) doc!: AnyDto<Schedule>;

  items: string[] = [];

  constructor(private schedules: SchedulesService) {}

  ngOnInit(): void {
    this.getKeys();
  }

  getKeys(): void {
    this.schedules.keys(this.doc._id).subscribe(data => {
      this.items = [...data];
    });
  }
}
