import { AnyDto, Data, Page } from '@weplanx/common';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { pages, TestPagesService } from './mock';

describe('测试数据源', () => {
  let httpTestingController: HttpTestingController;
  let service: TestPagesService;
  let data: Data<AnyDto<Page>> = new Data<AnyDto<Page>>();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TestPagesService]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TestPagesService);
  });

  it('测试选中状态', () => {
    data.set(pages);
    data.setNChecked(true);
    expect(data.values.map(v => v._id)).toEqual([...data.checkedIds.values()]);
    expect(data.checkedNumber).toEqual(pages.length);
    expect(data.indeterminate).toBeFalsy();
    expect(data.checked).toBeTruthy();
    data.setNChecked(false);
    expect(data.checkedIds.size).toEqual(0);
    expect(data.checkedNumber).toEqual(0);
    expect(data.indeterminate).toBeFalsy();
    expect(data.checked).toBeFalse();
    data.setChecked('61ca6ada2e83bf89116a4799', true);
    expect(data.checkedIds.has('61ca6ada2e83bf89116a4799')).toBeTruthy();
    expect(data.checkedIds.size).toEqual(1);
    expect(data.checkedNumber).toEqual(1);
    expect(data.indeterminate).toBeTruthy();
    expect(data.checked).toBeFalsy();
    data.clearChecked();
    expect(data.checkedIds.size).toEqual(0);
    expect(data.checkedNumber).toEqual(0);
    expect(data.indeterminate).toBeFalsy();
    expect(data.checked).toBeFalsy();
  });
});
