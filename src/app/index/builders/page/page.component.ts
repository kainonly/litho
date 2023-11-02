import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Builder } from '@common/models/builder';
import { BuildersService } from '@common/services/builders.service';
import { AnyDto } from '@weplanx/ng';

@Component({
  selector: 'app-index-builders-page',
  templateUrl: './page.component.html'
})
export class PageComponent implements OnInit, OnDestroy {
  data?: AnyDto<Builder>;

  private id!: string;
  private updated!: Subscription;

  constructor(
    private builders: BuildersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.getData();
    });
    this.updated = this.builders.updated.subscribe(id => {
      if (this.id === id) {
        this.getData();
      }
    });
  }

  ngOnDestroy(): void {
    this.updated.unsubscribe();
  }

  getData(): void {
    this.builders.findById(this.id).subscribe(data => {
      this.data = data;
    });
  }
}
