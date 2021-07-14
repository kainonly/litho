import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BitModule, Bit } from 'ngx-bit';
import { of } from 'rxjs';
import { BitSwalModule, BitSwalService } from 'ngx-bit/swal';
import { HttpClientModule } from '@angular/common/http';
import { delay } from 'rxjs/operators';
import { environment } from '@mock/env';
import { routes } from '@mock/routes';
import { ExampleModule } from '@mock/example.module';

describe('BitSwalService', () => {
  let bit: Bit;
  let swal: BitSwalService;
  let form: FormGroup;
  const responseOk = {
    error: 0
  };
  const responseError = {
    error: 1,
    msg: 'bad'
  };
  const reset = {
    name: 'kain'
  };

  beforeEach(done => {
    if (!swal) {
      TestBed.configureTestingModule({
        imports: [
          FormsModule,
          ReactiveFormsModule,
          HttpClientModule,
          RouterModule.forRoot(routes),
          BitModule.forRoot(environment.bit),
          BitSwalModule.forRoot(),
          ExampleModule
        ]
      });
      bit = TestBed.inject(Bit);
      swal = TestBed.inject(BitSwalService);
      bit.setupLocale();
      bit.registerLocales(import('@mock/common.language'));
      bit.setLocale('zh_cn');
      const fb = TestBed.inject(FormBuilder);
      form = fb.group({
        name: []
      });
      swal.ready.pipe(delay(500)).subscribe(() => {
        done();
      });
    } else {
      done();
    }
  });

  it('Test add response prompt box, click confirm', done => {
    swal.addAlert(responseOk, form, reset).subscribe(result => {
      expect(result).toBeTruthy();
      expect(form.get('name')!.value).toBe('kain');
      done();
    });
    const container = document.querySelector('.swal2-html-container')!;
    const title: HTMLElement = container.querySelector('.ant-result-title')!;
    expect(title.innerText).toBe(bit.l.AddAlertSuccessTitle);
    const content: HTMLElement = container.querySelector('.ant-result-subtitle')!;
    expect(content.innerText).toBe(bit.l.AddAlertSuccessContent);
    const confirm: HTMLButtonElement = document.querySelector('.swal2-confirm')!;
    expect(confirm.innerText).toBe(bit.l.AddAlertSuccessOk);
    const cancel: HTMLButtonElement = document.querySelector('.swal2-cancel')!;
    expect(cancel.innerText).toBe(bit.l.AddAlertSuccessCancel);
    confirm.click();
  });

  it('Test add response prompt box, click cancel', done => {
    swal.addAlert(responseOk, form).subscribe(result => {
      expect(result).toBeFalsy();
      done();
    });
    const cancel: HTMLButtonElement = document.querySelector('.swal2-cancel')!;
    cancel.click();
  });

  it('Test add response prompt box, response failed', done => {
    swal.addAlert(responseError, form).subscribe(result => {
      expect(result).toBeNull();
      done();
    });
    const container = document.querySelector('.swal2-html-container')!;
    const title: HTMLElement = container.querySelector('.ant-result-title')!;
    expect(title.innerText).toBe(bit.l.AddAlertErrorTitle);
    const content: HTMLElement = container.querySelector('.ant-result-subtitle')!;
    expect(content.innerText).toBe(responseError.msg);
    const confirm: HTMLButtonElement = document.querySelector('.swal2-confirm')!;
    expect(confirm.innerText).toBe(bit.l.AddAlertErrorOk);
    confirm.click();
  });

  it('Test edit response prompt box, click confirm', done => {
    swal.editAlert(responseOk).subscribe(result => {
      expect(result).toBeTruthy();
      done();
    });
    const container = document.querySelector('.swal2-html-container')!;
    const title: HTMLElement = container.querySelector('.ant-result-title')!;
    expect(title.innerText).toBe(bit.l.EditAlertSuccessTitle);
    const content: HTMLElement = container.querySelector('.ant-result-subtitle')!;
    expect(content.innerText).toBe(bit.l.EditAlertSuccessContent);
    const confirm: HTMLButtonElement = document.querySelector('.swal2-confirm')!;
    expect(confirm.innerText).toBe(bit.l.EditAlertSuccessOk);
    const cancel: HTMLButtonElement = document.querySelector('.swal2-cancel')!;
    expect(cancel.innerText).toBe(bit.l.EditAlertSuccessCancel);
    confirm.click();
  });

  it('Test edit response prompt box, click cancel', done => {
    swal.editAlert(responseOk).subscribe(result => {
      expect(result).toBeFalsy();
      done();
    });
    const cancel: HTMLButtonElement = document.querySelector('.swal2-cancel')!;
    cancel.click();
  });

  it('Test edit response prompt box, response failed', done => {
    swal.editAlert(responseError).subscribe(result => {
      expect(result).toBeNull();
      done();
    });
    const container: HTMLElement = document.querySelector('.swal2-html-container')!;
    const title: HTMLElement = container.querySelector('.ant-result-title')!;
    expect(title.innerText).toBe(bit.l.EditAlertErrorTitle);
    const content: HTMLElement = container.querySelector('.ant-result-subtitle')!;
    expect(content.innerText).toBe(responseError.msg);
    const confirm: HTMLButtonElement = document.querySelector('.swal2-confirm')!;
    expect(confirm.innerText).toBe(bit.l.EditAlertErrorOk);
    confirm.click();
  });

  it('Test delete response prompt box, click confirm', done => {
    swal.deleteAlert(of(responseOk)).subscribe(result => {
      expect(result).not.toBeNull();
      expect(result.error).toBe(0);
      done();
    });
    const container: HTMLElement = document.querySelector('.swal2-html-container')!;
    const title: HTMLElement = container.querySelector('.ant-result-title')!;
    expect(title.innerText).toBe(bit.l.DeleteAlertTitle);
    const content: HTMLElement = container.querySelector('.ant-result-subtitle')!;
    expect(content.innerText).toBe(bit.l.DeleteAlertContent);
    const confirm: HTMLButtonElement = document.querySelector('.swal2-confirm')!;
    expect(confirm.innerText).toBe(bit.l.DeleteAlertOk);
    const cancel: HTMLButtonElement = document.querySelector('.swal2-cancel')!;
    expect(cancel.innerText).toBe(bit.l.DeleteAlertCancel);
    confirm.click();
  });

  it('Test delete response prompt box, click cancel', done => {
    swal.deleteAlert(of(responseOk)).subscribe(
      _ => _,
      _ => _,
      () => {
        expect().nothing();
        done();
      }
    );
    const cancel: HTMLButtonElement = document.querySelector('.swal2-cancel')!;
    cancel.click();
  });
});
