import { Component, effect, input } from '@angular/core';
import { inject } from '@angular/core';
import { ProductDetailStateService } from '../../../data-access/product-detail-state.service';
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

  id = input.required<string>();

  constructor() {
    effect(() => {
      this.productDetailState.getById(this.id());
    });

  }
}
