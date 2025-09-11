import { Component, effect, input } from '@angular/core';
import { inject } from '@angular/core';
import { ProductDetailStateService } from '../../../data-access/product-detail-state.service';
import { CartStateService } from '../../../shared/data-access/cart-state.service';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe],
  templateUrl: './product-detail.html',
  styles: ``,
  providers: [ProductDetailStateService],
})
export default class ProductDetail {

  productDetailState = inject(ProductDetailStateService).state;
  private cartService = inject(CartStateService);

  id = input.required<string>();

  constructor() {
    effect(() => {
      this.productDetailState.getById(this.id());
    });
  }

  addToCart() {
    const product = this.productDetailState.product();
    if (product) {
      this.cartService.state.add({
        product,
        quantity: 1,
      });
      console.log('🛒 Adding product to cart from detail:', product.title);
    }
  }
}
