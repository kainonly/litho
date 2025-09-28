import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

import { StorageMap } from '@ngx-pwa/local-storage';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: ` <router-outlet></router-outlet> `
})
export class App implements OnInit {
  private destroyRef = inject(DestroyRef);
  private storage = inject(StorageMap);
  private swUpdate = inject(SwUpdate);

  ngOnInit(): void {
    this.storage.clear().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    this.checkUpdate();
  }

  checkUpdate(): void {
    if (this.swUpdate.isEnabled) {
      fromPromise(this.swUpdate.checkForUpdate())
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(evt => {
          if (evt && confirm('A new version is available. Do you want to update?')) {
            this.storage.clear().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
            window.location.reload();
          }
        });
    }
  }
}
