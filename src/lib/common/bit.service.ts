import {Injectable} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {Location} from '@angular/common';
import {StorageMap} from '@ngx-pwa/local-storage';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {NzI18nService} from 'ng-zorro-antd';
import {ConfigService} from './config.service';
import {EventsService} from './events.service';
import {
  factoryLocales,
  getSelectorFormUrl,
  i18nControlsAsyncValidate,
  i18nControlsValidate,
  i18nControlsValue
} from '../lib.common';
import {I18nGroupOptions, I18nTooltipOptions, Search, SearchOptions} from '../lib.types';

@Injectable()
export class BitService {
  /**
   * Origin language packer
   */
  private language: any = {};

  /**
   * app.language packer
   */
  private commonLanguage: any = {};

  /**
   * Static Path
   */
  static: string;

  /**
   * Upload Path
   */
  uploads: string;

  /**
   * Language pack identifier
   */
  locale: string;

  /**
   * Language pack label
   */
  l: any = {};

  /**
   * Component i18n identifier
   */
  i18n: string;

  /**
   * Component i18n tooltips
   */
  i18nTooltip: object | I18nTooltipOptions = {};

  /**
   * Component i18n
   */
  i18nContain: any[] = [];

  /**
   * Title
   */
  title = '';

  /**
   * Breadcrumb array
   */
  breadcrumb: any[] = [];

  /**
   * default breadcrumb top level
   */
  breadcrumbTop: any = 0;

  /**
   * Nav active array
   */
  navActive = [];

  /**
   * Control panel search object
   */
  search: Search | object = {};

  /**
   * Lists data loading status
   */
  listsLoading = true;

  /**
   * Lists data page limit
   */
  pageLimit = 0;

  /**
   * Lists data totals
   */
  listsTotals = 0;

  /**
   * Lists data page index
   */
  listsPageIndex = 1;

  /**
   * All list data is selected
   */
  listsAllChecked = false;

  /**
   * All list data has indeterminate
   */
  listsIndeterminate = false;

  /**
   * Control panel mutil operate status
   */
  listsDisabledAction = true;

  /**
   * All list data selecte total
   */
  listsCheckedNumber = 0;

  /**
   * constructor
   */
  constructor(
    private config: ConfigService,
    private events: EventsService,
    private location: Location,
    private router: Router,
    private storageMap: StorageMap,
    private nzI18nService: NzI18nService,
  ) {
    this.static = config.staticUrl;
    this.uploads = (config.uploadsUrl) ? config.uploadsUrl : config.originUrl + '/' + config.uploadsPath;
    this.pageLimit = config.pageLimit;
    this.breadcrumbTop = this.config.breadcrumbTop;
    this.i18n = config.i18nDefault;
    this.i18nContain = config.i18nContain;
    storageMap.get('locale').subscribe((data: any) => {
      if (!this.config.localeDefault) {
        this.locale = data ? data : 'zh_cn';
      } else {
        this.locale = data ? data : this.config.localeDefault;
      }

      if (this.config.localeBind !== undefined &&
        this.config.localeBind.size !== 0 &&
        this.config.localeBind.has(this.locale)) {
        this.nzI18nService.setLocale(this.config.localeBind.get(this.locale));
      }
    });
  }

  /**
   * open routerlink with cross level
   */
  open(urlTree: any[], extras?: NavigationExtras) {
    const url = this.router.url;
    if (url !== '/') {
      const selector = getSelectorFormUrl(this.router.url, ['%7B', '%7D']);
      const param = url.split('/').slice(2);
      if (param.length !== 0) {
        this.storageMap.set('cross:' + selector, param[0]).subscribe(() => {
        });
      }
    }
    if (urlTree.length !== 0) {
      this.router.navigate([
        '{' + urlTree[0] + '}',
        ...urlTree.slice(1)
      ], extras);
    }
  }

  /**
   * open use cross level
   */
  crossLevel(selector: string) {
    this.storageMap.get('cross:' + selector).subscribe(param => {
      if (!param) {
        this.router.navigateByUrl(`{${selector}}`);
      } else {
        this.storageMap.delete('cross:' + selector).subscribe(() => {
          this.router.navigateByUrl(`/{${selector}}/${param}`);
        });
      }
    });
  }

  /**
   * Location back
   */
  back() {
    this.location.back();
    this.resetI18n();
  }

  /**
   * Set language pack ID
   */
  setLocale(locale: string) {
    this.locale = locale;
    this.storageMap.set('locale', locale).subscribe(() => {
    });
    this.events.publish('locale', locale);
    this.l = Object.assign(
      this.commonLanguage[this.locale],
      this.language[this.locale]
    );

    if (this.config.localeBind !== undefined &&
      this.config.localeBind.size !== 0 &&
      this.config.localeBind.has(this.locale)) {
      this.nzI18nService.setLocale(this.config.localeBind.get(this.locale));
    }
  }

  /**
   * manual set breadcrumb
   */
  setBreadcrumb(...breadcrumb: any[]) {
    this.breadcrumb = breadcrumb;
  }

  /**
   * Equal i18n ID
   */
  equalI18n(i18n: string) {
    return this.i18n === i18n;
  }

  /**
   * Reset I18n ID
   */
  resetI18n() {
    this.i18n = this.config.i18nDefault;
  }

  /**
   * Registered language pack
   */
  registerLocales(packer: any, common = false) {
    if (common) {
      this.commonLanguage = factoryLocales(packer);
    } else {
      this.language = factoryLocales(packer);
      this.l = Object.assign(this.commonLanguage[this.locale], this.language[this.locale]);
    }
  }

  /**
   * Register search object
   */
  registerSearch(selector: string, ...search: SearchOptions[]): Observable<any> {
    this.search = {};
    return this.storageMap.get('search:' + selector).pipe(
      map((data: any) => {
        if (!data) {
          search.forEach(((value) => {
            this.search[value.field] = value;
          }));
        } else {
          this.search = data;
        }
        return true;
      })
    );
  }

  /**
   * Register section search object
   */
  registerSectionSearch(selector: string, variable: object, ...search: SearchOptions[]): Observable<any> {
    Reflect.ownKeys(variable).forEach(key => Reflect.deleteProperty(variable, key));
    return this.storageMap.get('search:' + selector).pipe(
      map((data: any) => {
        if (!data) {
          search.forEach(((value) => {
            variable[value.field] = value;
          }));
        } else {
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              variable[key] = data[key];
            }
          }
        }
        return true;
      })
    );
  }

  /**
   * Determine whether the index exists in the search object
   */
  hasSearch(field: string, variable?: object): boolean {
    return !variable ? this.search.hasOwnProperty(field) : variable.hasOwnProperty(field);
  }

  /**
   * Get conversion search array
   */
  getSearch(variable?: object): any[] {
    const search = [];
    if (!variable) {
      for (const i in this.search) {
        if (this.search.hasOwnProperty(i)) {
          search.push(this.search[i]);
        }
      }
    } else {
      for (const i in variable) {
        if (variable.hasOwnProperty(i)) {
          search.push(variable[i]);
        }
      }
    }
    return search;
  }

  /**
   * Refresh list data selection status
   */
  listsRefreshStatus(lists: any[]) {
    const allChecked = lists.every((value) => value.checked === true);
    const allUnchecked = lists.every((value) => !value.checked);
    this.listsAllChecked = allChecked;
    this.listsIndeterminate = !allChecked && !allUnchecked;
    this.listsDisabledAction = !(this.listsAllChecked || this.listsIndeterminate);
    this.listsCheckedNumber = lists.filter((value) => value.checked).length;
  }

  /**
   * Unified change of all list data status
   */
  listsCheckAll(event: boolean, lists: any[]) {
    lists.forEach((data) => (data.checked = event));
    this.listsRefreshStatus(lists);
  }

  /**
   * Init i18n form group
   */
  i18nGroup(options?: I18nGroupOptions): any {
    const controls = {};
    if (options) {
      for (const i18n of this.config.i18nContain) {
        controls[i18n] = [
          i18nControlsValue(
            i18n,
            Reflect.has(options, 'value') ? options.value : null
          ),
          i18nControlsValidate(
            i18n,
            Reflect.has(options, 'validate') ? options.validate : []
          ),
          i18nControlsAsyncValidate(
            i18n,
            Reflect.has(options, 'asyncValidate') ? options.asyncValidate : []
          )
        ];
      }
    }
    return controls;
  }

  /**
   * Parse i18n string json
   */
  i18nParse(raws: string) {
    const data = JSON.parse(raws);
    for (const i18n in data) {
      if (data.hasOwnProperty(i18n) &&
        this.config.i18nContain.indexOf(i18n) === -1) {
        Reflect.deleteProperty(data, i18n);
      }
    }
    return data;
  }
}
