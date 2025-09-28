import { Injectable } from '@angular/core';

import { Job } from '@shared/models/job';

import { Api } from '.';

@Injectable({ providedIn: 'root' })
export class JobsApi extends Api<Job> {
  protected override collection = 'jobs';
}
