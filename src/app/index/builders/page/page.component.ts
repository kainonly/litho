import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Builder } from '@common/models/builder';
import { BuildersService } from '@common/services/builders.service';
import { AnyDto } from '@weplanx/ng';

@Component({
  selector: 'app-index-builders-page',
  templateUrl: './page.component.html'
})
export class PageComponent implements OnInit {
  private id!: string;
  data?: AnyDto<Builder>;

  constructor(
    private builders: BuildersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.getData();
    });
  }

  getData(): void {
    this.builders.findById(this.id).subscribe(data => {
      this.data = data;
    });
  }
}
