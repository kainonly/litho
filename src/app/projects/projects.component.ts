import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

import { AppService } from '@app';
import { ProjectsService } from '@common/services/projects.service';

import { PagesService } from './pages/pages.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    public app: AppService,
    public pages: PagesService,
    private projects: ProjectsService
  ) {}

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
