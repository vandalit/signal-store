import { Component, input, output } from '@angular/core';
import { ProductItemCart } from '../../../shared/interfaces/product.interface';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-cart-item',
  imports: [CurrencyPipe],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.scss'
})
export class CartItem {
  productCartItem = input.required<ProductItemCart>();

  onRemove = output<number>();

  onIncrement = output<ProductItemCart>();

  onDecrement = output<ProductItemCart>();

}
