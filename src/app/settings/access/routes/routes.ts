import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SharedModule } from '@shared';

@Component({
  imports: [SharedModule],
  selector: 'app-settings-routes',
  templateUrl: './routes.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsRoutes {}
