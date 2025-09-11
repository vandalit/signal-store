import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./home/home').then(m => m.HomeComponent),
    },
    {
        path: 'products',
        loadChildren: () => import('./products/features/product-shell/product.route'),
    },
    {
        path: 'cart',
        loadChildren: () => import('./cart/cart.route'),
    },
    {
        path: 'checkout',
        loadChildren: () => import('./checkout/checkout.route'),
    },
    {
        path: '**',
        redirectTo: '',
    },
];
