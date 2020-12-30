import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NzUploadComponent, NzUploadModule } from 'ng-zorro-antd/upload';
import { BitConfigService, NgxBitModule } from 'ngx-bit';
import { BitDirectiveModule, BitUploadDirective } from 'ngx-bit/directive';
import { environment } from '../simulation/environment';

describe('BitUploadDirective', () => {
  let config: BitConfigService;
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    if (!component) {
      TestBed.configureTestingModule({
        declarations: [
          TestComponent
        ],
        imports: [
          NzUploadModule,
          BitDirectiveModule,
          NgxBitModule.forRoot(environment.bit)
        ]
      });
      config = TestBed.inject(BitConfigService);
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }
  });

  it('Test upload binding directive', () => {
    expect(component.ref.nzWithCredentials).toBe(config.api.withCredentials);
    expect(component.ref.nzAction).toBe(config.url.api + config.api.upload);
    expect(component.ref.nzSize).toBe(5120);
    expect(component.ref.nzShowUploadList).toBeFalsy();
  });
});

@Component({
  template: `
    <nz-upload
      #uploadComponent
      bitUpload
      nzListType='picture-card'
    >
    </nz-upload>
  `
})
class TestComponent {
  @ViewChild('uploadComponent') ref: NzUploadComponent;
}
