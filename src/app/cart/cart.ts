import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartItem } from './ui/cart-item/cart-item';
import { CartStateService } from '../shared/data-access/cart-state.service';
import { ProductItemCart } from '../shared/interfaces/product.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CartItem, CurrencyPipe, RouterLink],
  templateUrl: './cart.html',
  styles: ``
})
export default class Cart {
  cartService = inject(CartStateService);
  state = this.cartService.state;

  onRemove(id: number) {
    this.state.remove(id);
  }

  onIncrement(product: ProductItemCart) {
    this.state.update({
      product: product.product, 
      quantity: product.quantity + 1,
    });
  }

  onDecrement(product: ProductItemCart) {
    this.state.update({
      product: product.product,
      quantity: product.quantity - 1,
    });
  }
}
