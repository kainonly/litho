import {Injectable} from '@angular/core';
import {LocalStorage} from '@ngx-pwa/local-storage';
import {Observable, Subject} from 'rxjs';
import {ConfigService} from './config.service';
import {switchMap} from 'rxjs/operators';
import {I18nControlsOptions} from './interface';
import {FormGroup} from '@angular/forms';
import {Location} from '@angular/common';
import {NzNotificationService} from 'ng-zorro-antd';

@Injectable()
export class BitService {
  static: string;
  uploads: string;
  form: FormGroup;
  locale: 'zh_cn' | 'en_us' = 'zh_cn';
  localeChange: Subject<'zh_cn' | 'en_us'> = new Subject();
  l: any = {};
  private lang: Map<string, any> = new Map<string, any>();
  private common_language: any = {};
  i18ns: any[] = [];
  private menu: any = {};
  private actives = [];
  private breadcrumb = [];
  lists_loading = true;
  page_limit = 0;
  lists_totals = 0;
  lists_page_index = 0;
  lists_all_checked = false;
  lists_indeterminate = false;
  lists_disabled_action = true;
  lists_checked_number = 0;

  static i18nControlsValue(i18n: string, value?: any): string {
    if (!value) {
      return null;
    }
    if (value[i18n] !== undefined) {
      return value[i18n];
    } else {
      return null;
    }
  }

  static i18nControlsValidate(i18n: string, validate?: any) {
    if (!validate) {
      return [];
    }
    if (validate[i18n] !== undefined) {
      return [validate[i18n]];
    } else {
      return [];
    }
  }

  static i18nControlsAsyncValidate(i18n: string, asyncValidate?: any) {
    if (!asyncValidate) {
      return [];
    }
    if (asyncValidate[i18n] !== undefined) {
      return [asyncValidate[i18n]];
    } else {
      return [];
    }
  }

  constructor(private storage: LocalStorage,
              private config: ConfigService,
              private notification: NzNotificationService,
              private location: Location) {
    this.static = this.config.origin + this.config.static;
    this.uploads = this.config.origin + this.config.uploads;
    this.common_language = config.language;
    this.i18ns = config.i18n;
    this.page_limit = config.page_limit;
    storage.getItem('locate').subscribe(locate => {
      if (locate) {
        this.locale = locate;
      }
    });
  }

  setLocale(locale: 'zh_cn' | 'en_us') {
    this.storage.setItem('locate', locale).subscribe(status => {
      if (status) {
        this.locale = locale;
        this.localeChange.next(locale);
        this.l = this.lang.get(locale);
      }
    });
  }

  buildLanguage(args ?: any): any {
    let language = this.common_language;
    if (args) {
      language = Object.assign(language, args);
    }
    this.factoryLocales(language);
    this.l = this.lang.get(this.locale);
  }

  private factoryLocales(language: any) {
    const zh_cn = {};
    const en_us = {};
    for (const key in language) {
      if (language.hasOwnProperty(key)) {
        zh_cn[key] = language[key][0];
        en_us[key] = language[key][1];
      }
    }
    this.lang.set('zh_cn', zh_cn);
    this.lang.set('en_us', en_us);
  }

  setMenu(data: any): Observable<any> {
    return this.storage.setItem('menu', data.menu).pipe(
      switchMap(status => {
        if (status) {
          return this.storage.setItem('route', data.route);
        }
      })
    );
  }

  getMenu(route: string): Observable<any> {
    this.actives = [];
    this.breadcrumb = [];
    return this.storage.getItem('menu').pipe(
      switchMap(data => {
        this.menu = data;
        return this.storage.getItem('route');
      }),
      switchMap(data => Observable.create(observer => {
        this.actives.unshift(data[route].id);
        const bread = {
          name: data[route].name,
          routerlink: data[route].routerlink
        };
        this.breadcrumb.unshift(bread);
        if (data[route].parent !== 0) {
          this.infiniteMenu(data[route].parent);
        }
        observer.next({
          actives: this.actives,
          breadcrumb: this.breadcrumb
        });
        observer.complete();
      })));
  }

  private infiniteMenu(parent: number) {
    const data = this.menu[parent];
    this.actives.unshift(data.id);
    const bread = {
      name: data.name,
      routerlink: data.routerlink
    };
    this.breadcrumb.unshift(bread);
    if (this.menu[parent].parent !== 0) {
      this.infiniteMenu(this.menu[parent].parent);
    }
  }

  i18nControls(options?: I18nControlsOptions) {
    if (options === undefined) {
      options = {};
    }
    const controls = {};
    for (const x of this.config.i18n) {
      controls[x] = [
        BitService.i18nControlsValue(x, (options.value === undefined ? '' : options.value)),
        BitService.i18nControlsValidate(x, options.validate === undefined ? '' : options.validate),
        BitService.i18nControlsAsyncValidate(x, options.asyncValidate === undefined ? '' : options.asyncValidate)
      ];
    }
    return controls;
  }

  formExplain(name: string, pending?: boolean): boolean {
    if (pending) {
      return this.form.get(name).pending;
    }
    return !!(this.form.get(name).dirty && this.form.get(name).errors);
  }

  explain(name: string, sign: string) {
    if (sign === 'pending') {
      return this.form.get(name).pending;
    } else {
      return this.form.get(name).hasError(sign);
    }
  }

  submit(event, callback) {
    event.preventDefault();
    if (this.form) {
      for (const key in this.form.controls) {
        if (this.form.controls.hasOwnProperty(key)) {
          this.form.controls[key].markAsDirty();
        }
      }
      callback(this.form.value);
    }
  }

  back() {
    this.breadcrumb = [];
    this.actives = [];
    this.location.back();
  }

  listsRefreshStatus(lists: any[]) {
    const all_checked = lists.every(value => value.checked === true);
    const all_unchecked = lists.every(value => !value.checked);
    this.lists_all_checked = all_checked;
    this.lists_indeterminate = (!all_checked) && (!all_unchecked);
    this.lists_disabled_action = !(this.lists_all_checked || this.lists_indeterminate);
    this.lists_checked_number = lists.filter(value => value.checked).length;
  }

  listsCheckAll(event, lists: any[]) {
    lists.forEach(data => data.checked = event);
    this.listsRefreshStatus(lists);
  }

  statusChange(service: Observable<any>) {
    service.subscribe(res => {
      if (!res.error) {
        this.notification.success(this.l['operate_success'], this.l['status_success']);
      } else {
        this.notification.error(this.l['operate_error'], this.l['status_error']);
      }
    });
  }
}
