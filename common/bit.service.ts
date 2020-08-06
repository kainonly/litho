import { Injectable, Optional } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Location } from '@angular/common';
import { StorageMap } from '@ngx-pwa/local-storage';
import { NzI18nService } from 'ng-zorro-antd';
import { BitConfigService } from './bit-config.service';
import { BitEventsService } from './bit-events.service';
import { BitSupportService } from './bit-support.service';
import { ListByPage } from '../factory/list-by-page';
import { factoryLocales } from '../operates/factory-locales';
import { getSelectorFormUrl } from '../operates/get-selector-form-url';
import { i18nControlsValue } from '../operates/i18n-controls-value';
import { i18nControlsValidate } from '../operates/i18n-controls-validate';
import { i18nControlsAsyncValidate } from '../operates/i18n-controls-async-validate';
import { ListByPageOption, I18nGroupOption, I18nTooltipOption } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class BitService {
  /**
   * Component language packer
   */
  private lang: any = {};
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
  i18nTooltip: I18nTooltipOption | any = {};
  /**
   * Component i18n
   */
  i18nContain: any[] = [];

  /**
   * constructor
   */
  constructor(
    private config: BitConfigService,
    private events: BitEventsService,
    private location: Location,
    private router: Router,
    private storageMap: StorageMap,
    private nzI18nService: NzI18nService,
    @Optional() public support: BitSupportService
  ) {
    this.static = config.url.static;
    this.uploads = config.url.api + config.api.upload;
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
      this.config.getLang(this.locale),
      this.lang[this.locale]
    );
    const bind = this.config.locale.bind;
    if (bind.size !== 0 && bind.has(this.locale)) {
      this.nzI18nService.setLocale(bind.get(this.locale));
    }
  }

  /**
   * Registered language pack
   */
  registerLocales(packer: Promise<any>) {
    packer.then(result => {
      this.lang = factoryLocales(result.default, this.config.locale.mapping);
      this.l = Object.assign(
        this.config.getLang(this.locale),
        this.lang[this.locale]
      );
    });
  }

  /**
   * factory list by page
   */
  listByPage(option: ListByPageOption): ListByPage {
    if (!option.limit) {
      option.limit = this.config.page;
    }
    return new ListByPage(option, this.storageMap);
  }

  /**
   * Equal i18n ID
   */
  equalI18n(i18n: string): boolean {
    return this.i18n === i18n;
  }

  /**
   * Reset I18n ID
   */
  resetI18n() {
    this.i18n = this.config.i18n.default.toString();
  }

  /**
   * Init i18n form group
   */
  i18nGroup(options?: I18nGroupOption): any {
    const controls = {};
    if (options) {
      for (const i18n of this.config.i18n.contain) {
        controls[i18n] = [
          i18nControlsValue(
            i18n,
            options.value !== undefined ? options.value : null
          ),
          i18nControlsValidate(
            i18n,
            options.validate !== undefined ? options.validate : []
          ),
          i18nControlsAsyncValidate(
            i18n,
            options.asyncValidate !== undefined ? options.asyncValidate : []
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
        delete data.i18n;
      }
    }
    return data;
  }
}
