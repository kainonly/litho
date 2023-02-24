import { Component, OnInit } from '@angular/core';

import { ProjectsService } from '@common/services/projects.service';
import { Project } from '@common/types';
import { AnyDto, WpxData } from '@weplanx/ng';

@Component({
  selector: 'app-work-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  searchText?: string;
  projects: WpxData<AnyDto<Project>> = new WpxData();
  options: string[] = [];

  constructor(private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(refresh = false): void {
    this.projectsService.pages(this.projects, refresh).subscribe(() => {
      console.debug('ok');
    });
  }

  submitSearch(): void {
    if (!this.searchText) {
      this.projects.filter = {};
    } else {
      this.projects.filter = {
        $or: [{ name: { $regex: this.searchText } }, { namespace: { $regex: this.searchText } }]
      };
    }
    this.getData(true);
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.options = value ? [value, value + value, value + value + value] : [];
  }
}
