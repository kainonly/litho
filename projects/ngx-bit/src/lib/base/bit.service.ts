import {Injectable} from '@angular/core';
import {Location} from '@angular/common';
import {ConfigService} from './config.service';
import {EventsService} from './events.service';
import {factoryLocales} from '../operates/factoryLocales';
import {Observable} from 'rxjs';
import {LocalStorage} from '@ngx-pwa/local-storage';
import {map} from 'rxjs/operators';

@Injectable()
export class BitService {
  static: string;
  uploads: string;
  locale: string;

  l: any = {};
  i18nContain: any[] = [];
  i18nTips: any = {};
  search: { field: string, op: string, value: any }[] = [];

  private language: any = {};
  private commonLanguage: any = {};

  navActive = [];
  breadtitle = '';
  breadcrumb = [];

  listsLoading = true;
  pageLimit = 0;
  listsTotals = 0;
  listsPageIndex = 1;
  listsAllChecked = false;
  listsIndeterminate = false;
  listsDisabledAction = true;
  listsCheckedNumber = 0;

  constructor(private config: ConfigService,
              private events: EventsService,
              private location: Location,
              private storage: LocalStorage) {
    this.static = config.staticUrl;
    this.uploads = (config.uploadsUrl) ? config.uploadsUrl : config.originUrl + '/' + config.uploadsPath;
    this.pageLimit = config.pageLimit;
    this.i18nContain = config.i18nContain;
    this.locale = localStorage.getItem('locale') ? localStorage.getItem('locale') : 'zh_cn';
  }

  setLocale(locale: 'zh_cn' | 'en_us') {
    this.locale = locale;
    localStorage.setItem('locale', locale);
    this.events.publish('locale', locale);
    this.l = Object.assign(this.commonLanguage[this.locale], this.language[this.locale]);
  }

  registerLocales(packer: any, common = false) {
    if (common) {
      this.commonLanguage = factoryLocales(packer);
    } else {
      this.language = factoryLocales(packer);
      this.l = Object.assign(this.commonLanguage[this.locale], this.language[this.locale]);
    }
  }

  hasSearch(): boolean {
    return this.search.length !== 0;
  }

  registerSearch(selector: string, ...search: { field: string, op: string, value: any }[]): Observable<any> {
    return this.storage.getItem('search:' + selector).pipe(
      map((data: any) => {
        this.search = (!data) ? search : data;
        return true;
      })
    )
  }

  back() {
    this.location.back();
  }

  listsRefreshStatus(lists: any[]) {
    const allChecked = lists.every((value) => value.checked === true);
    const allUnchecked = lists.every((value) => !value.checked);
    this.listsAllChecked = allChecked;
    this.listsIndeterminate = !allChecked && !allUnchecked;
    this.listsDisabledAction = !(this.listsAllChecked || this.listsIndeterminate);
    this.listsCheckedNumber = lists.filter((value) => value.checked).length;
  }

  listsCheckAll(event, lists: any[]) {
    lists.forEach((data) => (data.checked = event));
    this.listsRefreshStatus(lists);
  }

  // i18nControls(options?: I18nControlsOptions) {
  //   if (options === undefined) {
  //     options = {};
  //   }
  //   const controls = {};
  //   for (const x of this.config.i18n) {
  //     controls[x] = [
  //       i18nControlsValue(x, options.value === undefined ? '' : options.value),
  //       i18nControlsValidate(x, options.validate === undefined ? '' : options.validate),
  //       i18nControlsAsyncValidate(x, options.asyncValidate === undefined ? '' : options.asyncValidate)
  //     ];
  //   }
  //   return controls;
  // }

  // i18nCommonValidator(group: string) {
  //   if (!this.form || !this.form.get(group)) {
  //     return;
  //   }
  //
  //   const empty = [];
  //   const formgroup = this.form.get(group);
  //   for (const x of this.i18ns) {
  //     const value = formgroup.get(x).value;
  //     if (!value) {
  //       empty.push(x);
  //     }
  //   }
  //
  //   this.i18nTips[group] = empty;
  //   return empty;
  // }
  //
  // i18nUpdateValidity(group: string, i18n: string) {
  //   for (const x of this.i18ns) {
  //     if (x !== i18n) {
  //       this.form.get(group).get(x).updateValueAndValidity();
  //     }
  //   }
  // }
}
