import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BitErrorTipComponent, BitComponentModule } from 'ngx-bit/component';

describe('BitErrorTipComponent', () => {
  let component: BitErrorTipComponent;
  let fixture: ComponentFixture<BitErrorTipComponent>;

  beforeEach(() => {
    if (!component) {
      TestBed.configureTestingModule({
        imports: [
          BitComponentModule
        ]
      });
      fixture = TestBed.createComponent(BitErrorTipComponent);
      component = fixture.componentInstance;
    }
  });

  it('Test form error notification component', () => {
    component.hasError = {
      required: '当前数值必须不为空'
    };
    component.ngOnChanges({
      hasError: new SimpleChange(null, component.hasError, true)
    });
    fixture.detectChanges();
    const data = component.values.find(v => v.key === 'required');
    expect(data.error).toBe('当前数值必须不为空');
    expect(component.ref).not.toBeNull();
  });
});
