import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { environment } from '../simulation/environment';
import { BitConfig, BitModule, BitService } from 'ngx-bit';
import { of } from 'rxjs';
import { BitSwalModule, BitSwalService } from 'ngx-bit/swal';
import { HttpClientModule } from '@angular/common/http';

describe('BitSwalService', () => {
  let config: BitConfig;
  let bit: BitService;
  let swal: BitSwalService;
  let fb: FormBuilder;

  beforeEach((done) => {
    if (!swal) {
      TestBed.configureTestingModule({
        imports: [
          FormsModule,
          ReactiveFormsModule,
          HttpClientModule,
          RouterModule.forRoot([]),
          BitModule.forRoot(environment.bit),
          BitSwalModule.forRoot()
        ]
      });
      config = TestBed.inject(BitConfig);
      bit = TestBed.inject(BitService);
      swal = TestBed.inject(BitSwalService);
      fb = TestBed.inject(FormBuilder);
      bit.registerLocales(import('../simulation/common.language'));
      setTimeout(() => {
        bit.registerLocales(import('../simulation/language'));
        setTimeout(() => {
          done();
        }, 200);
      }, 200);
    } else {
      done();
    }
  });

  it('Test add response prompt box, click confirm', (done) => {
    const form = fb.group({
      name: [],
      status: [true]
    });
    const res: any = {
      error: 0
    };
    setTimeout(() => {
      const swal2: HTMLElement = document.querySelector('#swal2-content');
      const title: HTMLElement = swal2.querySelector('.ant-result-title');
      expect(title.innerText).toBe(bit.l.AddAlertSuccessTitle);
      const content: HTMLElement = swal2.querySelector('.ant-result-subtitle');
      expect(content.innerText).toBe(bit.l.AddAlertSuccessContent);
      const confirm: HTMLButtonElement = document.querySelector('.swal2-confirm');
      expect(confirm.innerText).toBe(bit.l.AddAlertSuccessOk);
      const cancel: HTMLButtonElement = document.querySelector('.swal2-cancel');
      expect(cancel.innerText).toBe(bit.l.AddAlertSuccessCancel);
      confirm.click();
    }, 200);
    swal.addAlert(res, form, { name: 'kain' }).subscribe(result => {
      expect(result).toBeTruthy();
      expect(form.get('name').value).toBe('kain');
      done();
    });
  });

  it('Test add response prompt box, click cancel', (done) => {
    const form = fb.group({
      name: [],
      status: [true]
    });
    const res: any = {
      error: 0
    };
    setTimeout(() => {
      const cancel: HTMLButtonElement = document.querySelector('.swal2-cancel');
      cancel.click();
    }, 200);
    swal.addAlert(res, form).subscribe(result => {
      expect(result).toBeFalsy();
      done();
    });
  });

  it('Test add response prompt box, response failed', (done) => {
    const form = fb.group({
      name: [],
      status: [true]
    });
    const res: any = {
      error: 1,
      msg: 'add failed'
    };
    setTimeout(() => {
      const swal2: HTMLElement = document.querySelector('#swal2-content');
      const title: HTMLElement = swal2.querySelector('.ant-result-title');
      expect(title.innerText).toBe(bit.l.AddAlertErrorTitle);
      const content: HTMLElement = swal2.querySelector('.ant-result-subtitle');
      expect(content.innerText).toBe(res.msg);
      const confirm: HTMLButtonElement = document.querySelector('.swal2-confirm');
      expect(confirm.innerText).toBe(bit.l.AddAlertErrorOk);
      confirm.click();
    }, 200);
    swal.addAlert(res, form).subscribe(result => {
      expect(result).toBeNull();
      done();
    });
  });

  it('Test edit response prompt box, click confirm', (done) => {
    const res: any = {
      error: 0
    };
    setTimeout(() => {
      const swal2: HTMLElement = document.querySelector('#swal2-content');
      const title: HTMLElement = swal2.querySelector('.ant-result-title');
      expect(title.innerText).toBe(bit.l.EditAlertSuccessTitle);
      const content: HTMLElement = swal2.querySelector('.ant-result-subtitle');
      expect(content.innerText).toBe(bit.l.EditAlertSuccessContent);
      const confirm: HTMLButtonElement = document.querySelector('.swal2-confirm');
      expect(confirm.innerText).toBe(bit.l.EditAlertSuccessOk);
      const cancel: HTMLButtonElement = document.querySelector('.swal2-cancel');
      expect(cancel.innerText).toBe(bit.l.EditAlertSuccessCancel);
      confirm.click();
    }, 200);
    swal.editAlert(res).subscribe(result => {
      expect(result).toBeTruthy();
      done();
    });
  });

  it('Test edit response prompt box, click cancel', (done) => {
    const res: any = {
      error: 0
    };
    setTimeout(() => {
      const cancel: HTMLButtonElement = document.querySelector('.swal2-cancel');
      cancel.click();
    }, 200);
    swal.editAlert(res).subscribe(result => {
      expect(result).toBeFalsy();
      done();
    });
  });

  it('Test edit response prompt box, response failed', (done) => {
    const res: any = {
      error: 1,
      msg: 'edit fail'
    };
    setTimeout(() => {
      const swal2: HTMLElement = document.querySelector('#swal2-content');
      const title: HTMLElement = swal2.querySelector('.ant-result-title');
      expect(title.innerText).toBe(bit.l.EditAlertErrorTitle);
      const content: HTMLElement = swal2.querySelector('.ant-result-subtitle');
      expect(content.innerText).toBe(res.msg);
      const confirm: HTMLButtonElement = document.querySelector('.swal2-confirm');
      expect(confirm.innerText).toBe(bit.l.EditAlertErrorOk);
      confirm.click();
    }, 200);
    swal.editAlert(res).subscribe(result => {
      expect(result).toBeNull();
      done();
    });
  });

  it('Test delete response prompt box, click confirm', (done) => {
    const res: any = of({
      error: 0,
      msg: 'ok'
    });
    setTimeout(() => {
      const swal2: HTMLElement = document.querySelector('#swal2-content');
      const title: HTMLElement = swal2.querySelector('.ant-result-title');
      expect(title.innerText).toBe(bit.l.DeleteAlertTitle);
      const content: HTMLElement = swal2.querySelector('.ant-result-subtitle');
      expect(content.innerText).toBe(bit.l.DeleteAlertContent);
      const confirm: HTMLButtonElement = document.querySelector('.swal2-confirm');
      expect(confirm.innerText).toBe(bit.l.DeleteAlertOk);
      const cancel: HTMLButtonElement = document.querySelector('.swal2-cancel');
      expect(cancel.innerText).toBe(bit.l.DeleteAlertCancel);
      confirm.click();
    }, 200);
    swal.deleteAlert(res).subscribe(result => {
      expect(result).not.toBeNull();
      expect(result.error).toBe(0);
      expect(result.msg).toBe('ok');
      done();
    });
  });

  it('Test delete response prompt box, click cancel', (done) => {
    const res: any = of({
      error: 0
    });
    setTimeout(() => {
      const container = document.querySelector('.swal2-container');
      expect(container).not.toBeNull();
      const cancel: HTMLButtonElement = document.querySelector('.swal2-cancel');
      cancel.click();
    }, 200);
    swal.deleteAlert(res).subscribe({
      // tslint:disable-next-line:typedef
      complete() {
        setTimeout(() => {
          const container = document.querySelector('.swal2-container');
          expect(container).toBeNull();
          done();
        }, 500);
      }
    });
  });
});
