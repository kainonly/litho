import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BitModule, BitSupportService } from 'ngx-bit';
import { BitHeaderComponent, BitExtModule } from 'ngx-bit/component';
import { environment } from '../../simulation/environment';

describe('BitHeaderComponent', () => {
  let support: BitSupportService;
  let component: BitHeaderComponent;
  let fixture: ComponentFixture<BitHeaderComponent>;
  let test: ComponentFixture<TestComponent>;

  beforeEach(() => {
    if (!component) {
      TestBed.configureTestingModule({
        imports: [
          BitExtModule,
          BitModule.forRoot(environment.bit)
        ]
      });
      support = TestBed.inject(BitSupportService);
      fixture = TestBed.createComponent(BitHeaderComponent);
      component = fixture.componentInstance;
      test = TestBed.createComponent(TestComponent);
    }
  });

  it('Test', (done) => {
    expect(support.subTitle).toBeUndefined();
    expect(support.back).toBeFalsy();
    expect(support.actions).toBeUndefined();
    support.status.subscribe(() => {
      expect(support.subTitle).toEqual('this is subTitle');
      expect(support.back).toBeTruthy();
      expect(support.actions).toBeDefined();
      expect(support.actions).toBeInstanceOf(TemplateRef);
      fixture.destroy();
      expect(support.subTitle).toBeUndefined();
      expect(support.back).toBeFalsy();
      expect(support.actions).toBeUndefined();
      done();
    });
    component.back = true;
    component.subTitle = 'this is subTitle';
    component.actions = test.componentInstance.tpl;
    fixture.detectChanges();
  });
});

@Component({
  template: `
    <ng-template #tpl>
      abcd
    </ng-template>
  `
})
class TestComponent {
  @ViewChild('tpl') tpl: TemplateRef<any>;
}
