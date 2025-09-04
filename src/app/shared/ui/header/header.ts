import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartStateService } from '../../data-access/cart-state.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="bg-white shadow-sm border-b">
      <nav class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-8">
            <a routerLink="/" class="text-2xl font-bold text-gray-900">
              Signal Store
            </a>
            <div class="hidden md:flex space-x-6">
              <a routerLink="/products" 
                 routerLinkActive="text-blue-600 border-b-2 border-blue-600"
                 class="text-gray-700 hover:text-blue-600 transition-colors pb-1">
                Productos
              </a>
            </div>
          </div>
          
          <div class="flex items-center space-x-4">
            <a routerLink="/cart" 
               routerLinkActive="text-blue-600"
               class="relative text-gray-700 hover:text-blue-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
                   fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" 
                   stroke-linejoin="round" class="w-6 h-6">
                <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M17 17h-11v-14h-2" />
                <path d="M6 5l14 1l-1 7h-13" />
              </svg>
              @if (cartCount() > 0) {
                <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {{ cartCount() }}
                </span>
              }
            </a>
          </div>
        </div>
      </nav>
    </header>
  `,
  styles: ``
})
export class Header {
  private cartService = inject(CartStateService);
  cartCount = this.cartService.count;
}
