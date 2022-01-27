import { HttpClient } from '@angular/common/http';
import { Directive, Input, OnInit, Renderer2 } from '@angular/core';
import { concatMap, delay, fromEvent, iif, of, retryWhen, switchMapTo, throwError } from 'rxjs';

import { NzImageDirective } from 'ng-zorro-antd/image';

@Directive({
  selector: 'img[wpxRetry]'
})
export class WpxRetryDirective implements OnInit {
  @Input() wpxRetryCount = 5;
  @Input() wpxDelay = 5000;

  constructor(private image: NzImageDirective, private http: HttpClient, private renderer: Renderer2) {}

  ngOnInit(): void {
    const retry = retryWhen(errors =>
      errors.pipe(concatMap((e, i) => iif(() => i > 5, throwError(e), of(e).pipe(delay(5000)))))
    );
    fromEvent(this.image.backLoadImage, 'error')
      .pipe(delay(this.wpxDelay), switchMapTo(this.http.head(this.image.nzSrc, { observe: 'response' }).pipe(retry)))
      .subscribe(() => {
        this.renderer.setAttribute(this.image.backLoadImage, 'src', this.image.nzSrc);
      });
  }
}
