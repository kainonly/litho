import { Injectable, Optional } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Location } from '@angular/common';
import { StorageMap } from '@ngx-pwa/local-storage';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { ListByPageOption, I18nGroupOption, I18nTooltipOption } from 'ngx-bit/types';
import { BitConfigService } from './bit-config.service';
import { BitEventsService } from './bit-events.service';
import { BitSupportService } from './bit-support.service';
import { ListByPage } from '../factory/list-by-page';
import { factoryLocales } from '../operates/factory-locales';
import { getSelectorFormUrl } from '../operates/get-selector-form-url';


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
  i18nTooltip: I18nTooltipOption = {};
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
  open(urlTree: any[], extras?: NavigationExtras): void {
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
  crossLevel(selector: string): void {
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
  back(): void {
    this.location.back();
    this.resetI18n();
  }

  /**
   * Registered language pack
   */
  registerLocales(packer: object | Promise<any>): void {
    Promise.resolve(packer).then(result => {
      this.lang = factoryLocales(result.default, this.config.locale.mapping);
      this.l = Object.assign(
        this.config.getLang(this.locale),
        this.lang[this.locale]
      );
    });
  }

  /**
   * Set language pack ID
   */
  setLocale(locale: string): void {
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
  resetI18n(): void {
    this.i18n = this.config.i18n.default.toString();
  }

  /**
   * Init i18n form group
   */
  i18nGroup(options: I18nGroupOption): any {
    const controls = {};
    if (options) {
      for (const ID of this.config.i18n.contain) {
        controls[ID] = [null, [], []];
        if (options.value !== undefined && options.value.hasOwnProperty(ID)) {
          controls[ID][0] = options.value[ID];
        }
        if (options.validate !== undefined && options.validate.hasOwnProperty(ID)) {
          controls[ID][1] = options.validate[ID];
        }
        if (options.asyncValidate !== undefined && options.asyncValidate.hasOwnProperty(ID)) {
          controls[ID][2] = options.asyncValidate[ID];
        }
      }
    }
    return controls;
  }

  /**
   * Parse i18n string json
   */
  i18nParse(raws: string): any {
    const lang: any = JSON.parse(raws);
    const data: any = {};
    for (const ID of this.config.i18n.contain) {
      if (lang.hasOwnProperty(ID)) {
        data[ID] = lang[ID];
      }
    }
    return data;
  }
}
