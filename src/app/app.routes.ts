import { Routes } from '@angular/router';
import { productsFeature } from './pages/products/store/product-features';
import { provideState} from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as productsEffect from './pages/products/store/product-effects';
import { profileFeature } from './pages/profile/store/profile-features';
import * as profileEffects  from './pages/profile/store/profile-effects';
import * as cartEffects from './pages/cart/store/cart-effects';
import { cartFeature } from './pages/cart/store/cart-features';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then(m => m.LoginPage)
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/register/register').then(m => m.RegisterPage)
    },
    {
        path: '',
        loadComponent: () => import('./pages/main-layout').then(m => m.MainLayout),
        providers: [provideState(cartFeature), provideEffects(cartEffects)],
        canActivate: [authGuard],
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'products',
            },
            {
                path: 'products',
                loadComponent: () => import('./pages/products/products').then(m => m.ProductsPage),
                providers: [provideState(productsFeature), provideEffects(productsEffect)],
            },
            {
                path: 'cart',
                loadComponent: () => import('./pages/cart/cart').then(m => m.CartPage),
               
            },
            {
                path: 'profile',
                loadComponent: () => import('./pages/profile/profile').then(m => m.ProfilePage),
                providers:[provideState(profileFeature),provideEffects(profileEffects)]
            },
        ]
    }


];
