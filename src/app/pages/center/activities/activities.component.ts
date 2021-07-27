import { Component } from '@angular/core';

import { activitiesData } from './data';

@Component({
  selector: 'app-center-activities',
  templateUrl: './activities.component.html'
})
export class ActivitiesComponent {
  activities = activitiesData;
}
