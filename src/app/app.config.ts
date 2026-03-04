import { ApplicationConfig, InjectionToken } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideNgToast } from 'ng-angular-popup';
import { authFeatures } from './shared/store/auth-features';
import * as authEffects from './shared/store/auth-effects';

export const API_URL = new InjectionToken<string>('API_URL');

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(),
    provideEffects(authEffects),
    provideState(authFeatures),
    {
      provide: API_URL,
      useValue: 'https://fakestoreapi.com'
    },
    
    provideNgToast({
      duration: 4000,
      position: 'toaster-top-right',
      minWidth: 250,
      showProgress: true,
      dismissible: true,
    })
]
};


