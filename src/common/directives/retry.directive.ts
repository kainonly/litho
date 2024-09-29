import { HttpClient, HttpContext } from '@angular/common/http';
import { Directive, Input, OnInit, Renderer2 } from '@angular/core';
import { delay, fromEvent, retry, switchMap } from 'rxjs';

import { EXTERNAL } from '@common';
import { NzImageDirective } from 'ng-zorro-antd/image';

@Directive({
  standalone: true,
  selector: 'img[appRetry]'
})
export class RetryDirective implements OnInit {
  @Input() appRetryCount = 5;
  @Input() appDelay = 5000;

  constructor(
    private image: NzImageDirective,
    private http: HttpClient,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    fromEvent(this.image.backLoadImage, 'error')
      .pipe(
        delay(this.appDelay),
        switchMap(() =>
          this.http
            .head(this.image.nzSrc, { observe: 'response', context: new HttpContext().set(EXTERNAL, true) })
            .pipe(
              retry({
                delay: this.appDelay,
                count: this.appRetryCount
              })
            )
        )
      )
      .subscribe(() => {
        this.renderer.setAttribute(this.image.backLoadImage, 'src', this.image.nzSrc);
      });
  }
}
