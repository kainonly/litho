/* eslint-disable import/no-unassigned-import */
import '@angular/platform-server/init';

import { enableProdMode } from '@angular/core';

import { environment } from '@env';

if (environment.production) {
  enableProdMode();
}

export { AppServerModule } from './app/app.server.module';
export { renderModule } from '@angular/platform-server';
