import { AbstractControl, FormGroup } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export function asyncValidator(
  handle: Observable<boolean>,
  field = 'duplicated',
  dueTime = 500
): Observable<Record<string, any> | null> {
  return timer(dueTime).pipe(
    switchMap(() => handle),
    map(result => {
      return !result ? { error: true, [field]: true } : null;
    })
  );
}

export function updateFormGroup(controls: AbstractControl[]) {
  controls.forEach(control => {
    if (control instanceof FormGroup) {
      updateFormGroup(Object.values(control.controls));
    } else {
      control.markAsDirty();
      control.updateValueAndValidity();
    }
  });
}

/**
 * 加载脚本
 */
export function loadScript(doc: Document, url: string): Observable<undefined> {
  const script = doc.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  doc.body.appendChild(script);
  return new Observable<undefined>(observer => {
    script.onload = () => {
      observer.next();
      observer.complete();
    };
  });
}
