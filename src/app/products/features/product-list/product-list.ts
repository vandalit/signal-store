import { Component, inject } from '@angular/core';
import { ProductsStateService } from '../../../data-access/products-state.service';
import { ProductCard } from '../../ui/product-card/product-card';
import { CartStateService } from '../../../shared/data-access/cart-state.service';
import { Product } from '../../../shared/interfaces/product.interface';


@Component({
  selector: 'app-product-list',
  imports: [ProductCard],
  templateUrl: './product-list.html',
  providers: [ProductsStateService],
})

export default class ProductList {
  productState = inject(ProductsStateService);
  cartState = inject(CartStateService).state;

  changePage() {
    const page = this.productState.state.page() + 1;
    this.productState.changePage$.next(page);
  }

  addToCart(product: Product) {
    // FLAG: FALTA - Llamar al effect para guardar después de añadir
    this.cartState.add({
      product, quantity: 1,
    });
    // FLAG: NECESARIO - Trigger del effect saveOnAdd
    console.log('Adding product to cart:', product.title);
  }}