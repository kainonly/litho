import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'wpx-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WpxHeaderComponent {
  @Input() wpxLogout!: () => Observable<any>;

  constructor(private router: Router) {}

  logout(): void {
    this.wpxLogout().subscribe(v => {
      this.router.navigateByUrl('/login');
    });
  }
}
