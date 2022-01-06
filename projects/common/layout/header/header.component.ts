import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'wpx-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WpxHeaderComponent {
  logout(): void {}
}
