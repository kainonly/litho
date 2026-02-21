import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { Layout } from '@shared/models/layout';

export const appResolver: ResolveFn<Layout> = () => {
  return inject(HttpClient).get<Layout>('layout');
};
