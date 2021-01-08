import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ChangeDetectorRef,
  HostListener,
  AfterViewInit,
  ElementRef
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BitService, BitEventsService, BitSupportService } from 'ngx-bit';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { MainService } from '@common/main.service';
import { Subscription } from 'rxjs';
import { UiSerivce } from '@common/ui.serivce';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent implements OnInit, AfterViewInit, OnDestroy {
  collapsed = false;
  navLists: any[] = [];
  @ViewChild('warpper') warpper: ElementRef;

  private statusSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ui: UiSerivce,
    private mainService: MainService,
    private events: BitEventsService,
    private notification: NzNotificationService,
    public support: BitSupportService,
    public bit: BitService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.bit.registerLocales({});
    this.getMenuLists();
    this.support.setup(this.router);
    this.events.on('refresh-menu').subscribe(() => {
      this.getMenuLists();
    });
    this.statusSubscription = this.support.status.subscribe(() => {
      this.changeDetectorRef.detectChanges();
    });
  }

  ngAfterViewInit(): void {
    this.fetchNotOverflowHeight();
  }

  ngOnDestroy(): void {
    this.events.off('refresh-menu');
    this.support.unsubscribe();
    this.statusSubscription.unsubscribe();
  }

  @HostListener('window:resize')
  onresize(): void {
    this.fetchNotOverflowHeight();
  }

  private fetchNotOverflowHeight(): void {
    setTimeout(() => {
      const node = this.warpper.nativeElement;
      const parent = node.parentNode;
      let sibling = node.previousElementSibling;
      let notOverflowHeight = parent.offsetHeight;
      while (sibling) {
        notOverflowHeight -= sibling.offsetHeight;
        sibling = sibling.previousElementSibling;
      }
      this.ui.notOverflowHeight.next(notOverflowHeight);
    });
  }

  /**
   * Get Menu Lists
   */
  private getMenuLists(): void {
    this.mainService.resource().subscribe(data => {
      this.support.setResource(data.resource, data.router);
      this.navLists = data.nav;
    });
  }

  /**
   * User logout
   */
  logout(): void {
    this.mainService.logout().subscribe(() => {
      this.support.clearStorage();
      this.support.unsubscribe();
      this.router.navigateByUrl('/login');
      this.notification.success(this.bit.l.logout, this.bit.l.logoutSuccess);
    });
  }
}
