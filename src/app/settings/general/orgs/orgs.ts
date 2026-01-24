import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SharedModule } from '@shared';

@Component({
  imports: [SharedModule],
  selector: 'app-settings-orgs',
  templateUrl: './orgs.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Orgs {}
