import { Injectable, Optional } from '@angular/core';
import { NavigationExtras, PRIMARY_OUTLET, Router, UrlSegment } from '@angular/router';
import { Location } from '@angular/common';
import { StorageMap } from '@ngx-pwa/local-storage';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { ListByPageOption, I18nGroupOption, I18nTooltipOption } from 'ngx-bit/types';
import { ListByPage } from 'ngx-bit/factory';
import { factoryLocales } from 'ngx-bit/operates';
import { BitConfigService } from './bit-config.service';
import { BitEventsService } from './bit-events.service';
import { BitSupportService } from './bit-support.service';

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
   * Constructor
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
   * Route navigation
   */
  open(path: any[], extras?: NavigationExtras): void {
    if (path.length === 0) {
      return;
    }
    const url = this.router.url;
    if (url !== '/') {
      const primary = this.router.parseUrl(url).root.children[PRIMARY_OUTLET];
      const segments = primary.segments;
      if (segments.length > 1) {
        const key = segments[0].path;
        this.storageMap.set(
          'history:' + key, segments.splice(1)
        ).subscribe(() => {
        });
      }
    }
    const commands = [];
    path.forEach((value) => {
      if (typeof value === 'string') {
        commands.push(...value.split('/'));
      } else {
        commands.push(value);
      }
    });
    this.router.navigate(commands, extras);
  }

  /**
   * Route history
   */
  history(key: string): void {
    this.storageMap.get('history:' + key).subscribe((segments: UrlSegment[]) => {
      const commands = [key];
      if (segments && segments.length !== 0) {
        commands.push(...segments.map(v => v.path));
        this.storageMap.delete('history:' + key).subscribe(() => {
        });
      }
      this.router.navigate(commands);
    });
  }

  /**
   * Route back
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
