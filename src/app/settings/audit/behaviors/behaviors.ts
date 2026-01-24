import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SharedModule } from '@shared';

@Component({
  imports: [SharedModule],
  selector: 'app-settings-behaviors',
  templateUrl: './behaviors.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Behaviors {}
