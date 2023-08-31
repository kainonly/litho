import { Component, Input, OnInit } from '@angular/core';

import { Imessage } from '@common/models/imessage';
import { Project } from '@common/models/project';
import { ProjectsService } from '@common/services/projects.service';
import { AnyDto } from '@weplanx/ng';

@Component({
  selector: 'app-admin-imessages-controls',
  templateUrl: './controls.component.html'
})
export class ControlsComponent implements OnInit {
  @Input({ required: true }) doc!: AnyDto<Imessage>;
  @Input({ required: true }) updated!: () => void;

  projectDict: Record<string, AnyDto<Project>> = {};

  constructor(private projects: ProjectsService) {}

  ngOnInit(): void {
    this.getProjects(this.doc.projects);
  }

  getProjects(ids: string[]): void {
    this.projects
      .find(
        { _id: { $in: ids } },
        {
          xfilter: { '_id->$in': 'oids' }
        }
      )
      .subscribe(({ data }) => {
        data.forEach(v => (this.projectDict[v._id] = v));
      });
  }
}
