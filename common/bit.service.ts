import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Location } from '@angular/common';
import { StorageMap } from '@ngx-pwa/local-storage';
import { NzI18nService } from 'ng-zorro-antd';
import { ListByPage } from '../factory/list-by-page';
import { ListByPageOption } from '../types/list-by-page-option';
import { BitConfigService } from './bit-config.service';
import { EventsService } from './events.service';
import {
  factoryLocales,
  getSelectorFormUrl,
  i18nControlsAsyncValidate,
  i18nControlsValidate,
  i18nControlsValue
} from '../lib.common';
import { I18nGroupOptions, I18nTooltipOptions } from '../lib.types';

@Injectable({
  providedIn: 'root'
})
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
  readonly static: string;

  /**
   * Upload Path
   */
  readonly uploads: string;

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
  i18nTooltip: I18nTooltipOptions | any = {};

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
   * constructor
   */
  constructor(
    private config: BitConfigService,
    private events: EventsService,
    private location: Location,
    private router: Router,
    private storageMap: StorageMap,
    private nzI18nService: NzI18nService
  ) {
    this.static = config.url.static;
    this.uploads = config.url.api + config.api.upload;
    this.breadcrumbTop = 0;
    this.i18n = config.i18n.default;
    this.i18nContain = config.i18n.contain;
    storageMap.get('locale').subscribe((data: any) => {
      this.locale = data ? data : config.locale.default;
      const bind = config.locale.bind;
      if (bind.size !== 0 && bind.has(this.locale)) {
        nzI18nService.setLocale(bind.get(this.locale));
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
    const bind = this.config.locale.bind;
    if (bind.size !== 0 && bind.has(this.locale)) {
      this.nzI18nService.setLocale(bind.get(this.locale));
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
    this.i18n = this.config.i18n.default.toString();
  }

  listByPage(option: ListByPageOption): ListByPage {
    if (!option.limit) {
      option.limit = this.config.page;
    }
    return new ListByPage(option, this.storageMap);
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
   * Init i18n form group
   */
  i18nGroup(options?: I18nGroupOptions): any {
    const controls = {};
    if (options) {
      for (const i18n of this.config.i18n.contain) {
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
        this.config.i18n.contain.indexOf(i18n) === -1) {
        Reflect.deleteProperty(data, i18n);
      }
    }
    return data;
  }
}
