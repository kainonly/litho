/* tslint:disable:component-class-suffix */
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BitPrintComponent, BitComponentModule } from 'ngx-bit/component';

describe('BitPrintComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    if (!component) {
      TestBed.configureTestingModule({
        declarations: [
          TestComponent
        ],
        imports: [
          BitComponentModule
        ]
      });
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
    }
  });

  it('Test print work', () => {
    fixture.detectChanges();
    expect(component.result.nativeElement.innerText).toEqual('资源控制树视图中 S0 代表导航， S2 代表路由， S1 代表策略节点');
  });
});

@Component({
  template: `
    <span #result>
      <ng-container *ngTemplateOutlet="print.ref"></ng-container>
    </span>
    <bit-print #print [text]="text" [vars]="['S0',vars1,vars2]">
      <ng-template #vars1>
        S1
      </ng-template>
      <ng-template #vars2>
        S2
      </ng-template>
    </bit-print>
  `
})
class TestComponent {
  @ViewChild('result') result: ElementRef;
  @ViewChild('print') print: BitPrintComponent;

  text = '资源控制树视图中 $0 代表导航， $2 代表路由，$1 代表策略节点';
}
