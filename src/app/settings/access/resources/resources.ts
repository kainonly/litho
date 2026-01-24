import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SharedModule } from '@shared';

@Component({
  imports: [SharedModule],
  selector: 'app-settings-resources',
  templateUrl: './resources.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Resources {}
