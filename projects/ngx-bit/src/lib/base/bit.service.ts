import {Injectable} from '@angular/core';
import {Location} from '@angular/common';
import {FormGroup, ValidationErrors} from '@angular/forms';
import {LocalStorage} from '@ngx-pwa/local-storage';
import {NzNotificationService} from 'ng-zorro-antd';
import {Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {I18nControlsOptions} from '../types/i18n-controls-options';
import {ConfigService} from './config.service';
import {EventsService} from './events.service';
import {factoryLocales} from '../operates/factoryLocales';
import {i18nControlsValue} from '../operates/i18nControlsValue';
import {i18nControlsValidate} from '../operates/i18nControlsValidate';
import {i18nControlsAsyncValidate} from '../operates/i18nControlsAsyncValidate';

@Injectable()
export class BitService {
  static: string;
  uploads: string;
  locale: string;
  form: FormGroup;
  forms: any = {};
  l: any = {};
  i18ns: any[] = [];
  i18nTips: any = {};
  listsLoading = true;
  search: { field: string, value: string }[] = [];
  pageLimit = 0;
  listsTotals = 0;
  listsPageIndex = 0;
  listsAllChecked = false;
  listsIndeterminate = false;
  listsDisabledAction = true;
  listsCheckedNumber = 0;

  private language: any = {};
  private commonLanguage: any = {};
  private menu: Map<number | string, any> = new Map();
  private actives = [];
  private breadcrumb = [];

  constructor(private storage: LocalStorage,
              private config: ConfigService,
              private notification: NzNotificationService,
              private events: EventsService,
              private location: Location) {
    this.static = config.static;
    this.uploads = config.origin + '/' + config.uploads;
    this.i18ns = config.i18n;
    this.pageLimit = config.pageLimit;
    this.locale = localStorage.getItem('locale') ? localStorage.getItem('locale') : 'zh_cn';
    events.on('locale').subscribe((locale) => {
      this.locale = locale;
    });
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

  setMenu(data: any): Observable<boolean> {
    return this.storage.setItem('menu', data.menu).pipe(
      switchMap((status) => {
        if (status) {
          return this.storage.setItem('route', data.route);
        }
      })
    );
  }

  private checkRouterEmpty(route: string, set = false): Observable<any> {
    return this.storage.getItem('menu').pipe(
      switchMap((data: any) => {
        if (set) {
          this.menu = data;
        }
        return this.storage.getItem('route');
      }),
      map((data: Map<string, any>) => {
        const status = data.has(route);
        if (status && set) {
          return data.get(route);
        } else {
          return status;
        }
      })
    );
  }

  getMenu(route: string, TypeOfString = false): Observable<any> {
    this.actives = [];
    this.breadcrumb = [];
    return this.checkRouterEmpty(route, true).pipe(
      map((data) => {
        if (!data) {
          return false;
        }
        this.actives.unshift(data.id);
        const bread = {
          name: data.name,
          routerlink: data.routerlink
        };
        this.breadcrumb.unshift(bread);
        if (!TypeOfString && data.parent !== 0) {
          this.infiniteMenu(data.parent, TypeOfString);
        }
        if (TypeOfString && data.parent !== '0') {
          this.infiniteMenu(data.parent, TypeOfString);
        }
        return {
          actives: this.actives,
          breadcrumb: this.breadcrumb
        };
      })
    );
  }

  private infiniteMenu(parent: number, TypeOfString: boolean) {
    const data = this.menu.get(parent);
    this.actives.unshift(data.id);
    const bread = {
      name: data.name,
      routerlink: data.routerlink
    };
    this.breadcrumb.unshift(bread);

    if (!TypeOfString && data.parent !== 0) {
      this.infiniteMenu(data.parent, TypeOfString);
    }
    if (TypeOfString && data.parent !== '0') {
      this.infiniteMenu(data.parent, TypeOfString);
    }
  }

  i18nControls(options?: I18nControlsOptions) {
    if (options === undefined) {
      options = {};
    }
    const controls = {};
    for (const x of this.config.i18n) {
      controls[x] = [
        i18nControlsValue(x, options.value === undefined ? '' : options.value),
        i18nControlsValidate(x, options.validate === undefined ? '' : options.validate),
        i18nControlsAsyncValidate(x, options.asyncValidate === undefined ? '' : options.asyncValidate)
      ];
    }
    return controls;
  }

  i18nCommonValidator(group: string) {
    if (!this.form || !this.form.get(group)) {
      return;
    }

    const empty = [];
    const formgroup = this.form.get(group);
    for (const x of this.i18ns) {
      const value = formgroup.get(x).value;
      if (!value) {
        empty.push(x);
      }
    }

    this.i18nTips[group] = empty;
    return empty;
  }

  i18nUpdateValidity(group: string, i18n: string) {
    for (const x of this.i18ns) {
      if (x !== i18n) {
        this.form.get(group).get(x).updateValueAndValidity();
      }
    }
  }

  formExplain(name: string, async = false, field?: string): ValidationErrors | boolean {
    if (!field) {
      if (async) {
        return (this.form.get(name).dirty && this.form.get(name).errors) || this.form.get(name).pending;
      } else {
        return this.form.get(name).dirty && this.form.get(name).errors;
      }
    } else {
      if (!this.forms.hasOwnProperty(field)) {
        return false;
      }
      if (async) {
        return (this.forms[field].get(name).dirty && this.forms[field].get(name).errors) || this.forms[field].get(name).pending;
      } else {
        return this.forms[field].get(name).dirty && this.forms[field].get(name).errors;
      }
    }
  }

  explain(name: string, sign: string, field?: string): boolean {
    if (!field) {
      if (sign === 'pending') {
        return this.form.get(name).pending;
      } else {
        return this.form.get(name).hasError(sign);
      }
    } else {
      if (!this.forms.hasOwnProperty(field)) {
        return false;
      }
      if (sign === 'pending') {
        return this.forms[field].get(name).pending;
      } else {
        return this.forms[field].get(name).hasError(sign);
      }
    }
  }

  back() {
    this.breadcrumb = [];
    this.actives = [];
    this.location.back();
  }

  registerSearch(selector: string, ...search: { field: string, value: any, op?: string }[]): Observable<any> {
    return this.storage.getItem('search:' + selector).pipe(
      map((data: any) => {
        this.search = (!data) ? search : data;
        return true;
      })
    );
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

  statusChange(service: Observable<any>, custom?: any) {
    service.subscribe((res) => {
      if (!res.error) {
        this.notification.success(this.l.operate_success, this.l.status_success);
      } else {
        if (custom && typeof custom === 'function') {
          custom(res);
        } else {
          this.notification.error(this.l.operate_error, this.l.status_error);
        }
      }
    });
  }
}
