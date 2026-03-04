import { createEffect, ofType, Actions } from '@ngrx/effects';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { authActions } from './auth-actions';
import { AuthApiService } from '../services/auth-api';
import { catchError, switchMap, of, map } from 'rxjs';
import { MyStorage } from '../services/storage';
import { extractToken } from '../utils/utils';
import { NgToastService } from 'ng-angular-popup';

export const loginEffect = createEffect(
  (actions$ = inject(Actions), authApi = inject(AuthApiService), router = inject(Router), storage = inject(MyStorage), toast = inject(NgToastService)) => {
    return actions$.pipe(
      ofType(authActions.login),
      switchMap(loginRequest =>
        authApi.loginRequest(loginRequest).pipe(
          map(response => {
            router.navigateByUrl('/products');
            toast.success('Login Successful', 'SUCCESS');
            storage.setItem('store_token', response.token);
            const payload = extractToken(response.token);
            if (payload) {
              return authActions.loginSuccess({ token: response.token, userId: payload.sub });
            }
            return authActions.loginSuccess({ token: response.token, userId: null });
          }),
          catchError((error) => {
            toast.danger('Login Failed', 'ERROR');
            return of(authActions.loginFailure({ error: error.message }));
          }
          )
        )
      ))
  }, { functional: true }
);

export const registerEffect = createEffect(
  (actions$ = inject(Actions), authApi = inject(AuthApiService), router = inject(Router), toast = inject(NgToastService)) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap(registerRequest => {
        return authApi.registerRequest(registerRequest).pipe(
          map(() => {
            router.navigateByUrl('/login');
            toast.success('Registration Successful', 'SUCCESS');
            return authActions.registerSuccess();
          }),
          catchError((error) => {
            toast.danger('Registration Failed', 'ERROR');
            return of(authActions.registerFailure({ error: error.message }));
          }
          )
        )
      }
      ))
  }, { functional: true }
);

export const logoutEffect = createEffect(
  (actions$ = inject(Actions), storage = inject(MyStorage), router = inject(Router), toast = inject(NgToastService)) => {
    return actions$.pipe(
      ofType(authActions.logout),
      map(() => {
        storage.removeItem('store_token');
        router.navigateByUrl('/login');
        toast.info('Logged out successfully', 'INFO');

        return authActions.logoutSuccess();
      })
    );
  }, { functional: true }
);