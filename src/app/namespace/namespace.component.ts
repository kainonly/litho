import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

import { AppService } from '@app';
import { ProjectsService } from '@common/projects.service';

@Component({
  selector: 'app-namespace',
  templateUrl: './namespace.component.html',
  styleUrls: ['./namespace.component.scss']
})
export class NamespaceComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute, public app: AppService, private projects: ProjectsService) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map(v => v.get('namespace')),
        switchMap(namespace => this.projects.findOne({ namespace }))
      )
      .subscribe(v => {
        this.app.project = v;
      });
  }

  ngOnDestroy(): void {
    this.app.project = undefined;
  }
}
