import { Routes } from '@angular/router';

export default [
    {
        path: '',
        loadComponent: () => import('./checkout').then(m => m.CheckoutComponent)
    },
    {
        path: 'payment',
        loadComponent: () => import('./payment/payment').then(m => m.PaymentComponent)
    }
] as Routes;
