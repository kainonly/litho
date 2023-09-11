import { InjectionToken, StaticProvider } from '@angular/core';

export interface EnvOption {
  baseUrl: string;
  cdn: string;
}

export const ENV = new InjectionToken<EnvOption>('env');

export const provideEnv = (option: EnvOption): StaticProvider => {
  return { provide: ENV, useValue: option };
};
