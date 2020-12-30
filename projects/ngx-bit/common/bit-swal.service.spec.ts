import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { environment } from '../simulation/environment';
import { BitConfigService, BitService, BitSwalService, NgxBitModule } from 'ngx-bit';
import { of } from 'rxjs';

describe('BitSwalService', () => {
  let config: BitConfigService;
  let bit: BitService;
  let swal: BitSwalService;
  let fb: FormBuilder;

  beforeEach((done) => {
    if (!swal) {
      TestBed.configureTestingModule({
        imports: [
          FormsModule,
          ReactiveFormsModule,
          RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }),
          NgxBitModule.forRoot(environment.bit)
        ]
      });
      config = TestBed.inject(BitConfigService);
      bit = TestBed.inject(BitService);
      swal = TestBed.inject(BitSwalService);
      fb = TestBed.inject(FormBuilder);
      config.setupLocales(import('../simulation/common.language'));
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
      const title: HTMLElement = document.querySelector('#swal2-title');
      expect(title.innerText).toBe(bit.l.operateSuccess);
      const content: HTMLElement = document.querySelector('#swal2-content');
      expect(content.innerText).toBe(bit.l.addSuccessMsg);
      const confirm: HTMLButtonElement = document.querySelector('.swal2-confirm');
      expect(confirm.innerText).toBe(bit.l.addContinue);
      const cancel: HTMLButtonElement = document.querySelector('.swal2-cancel');
      expect(cancel.innerText).toBe(bit.l.operateBack);
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
      msg: 'schema wrong'
    };
    setTimeout(() => {
      const title: HTMLElement = document.querySelector('#swal2-title');
      expect(title.innerText).toBe(bit.l.operateError);
      const content: HTMLElement = document.querySelector('#swal2-content');
      expect(content.innerText).toBe(res.msg);
      const confirm: HTMLButtonElement = document.querySelector('.swal2-confirm');
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
      const title: HTMLElement = document.querySelector('#swal2-title');
      expect(title.innerText).toBe(bit.l.operateSuccess);
      const content: HTMLElement = document.querySelector('#swal2-content');
      expect(content.innerText).toBe(bit.l.editSuccessMsg);
      const confirm: HTMLButtonElement = document.querySelector('.swal2-confirm');
      expect(confirm.innerText).toBe(bit.l.editContinue);
      const cancel: HTMLButtonElement = document.querySelector('.swal2-cancel');
      expect(cancel.innerText).toBe(bit.l.operateBack);
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
      const title: HTMLElement = document.querySelector('#swal2-title');
      expect(title.innerText).toBe(bit.l.operateError);
      const content: HTMLElement = document.querySelector('#swal2-content');
      expect(content.innerText).toBe(res.msg);
      const confirm: HTMLButtonElement = document.querySelector('.swal2-confirm');
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
      const title: HTMLElement = document.querySelector('#swal2-title');
      expect(title.innerText).toBe(bit.l.operateWarning);
      const content: HTMLElement = document.querySelector('#swal2-content');
      expect(content.innerText).toBe(bit.l.deleteWarning);
      const confirm: HTMLButtonElement = document.querySelector('.swal2-confirm');
      expect(confirm.innerText).toBe(bit.l.deleteYes);
      const cancel: HTMLButtonElement = document.querySelector('.swal2-cancel');
      expect(cancel.innerText).toBe(bit.l.deleteCancel);
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
