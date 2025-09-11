import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartStateService } from '../../shared/data-access/cart-state.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment.html',
  styles: [`
    .coral-accent {
      @apply bg-coral-500 hover:bg-coral-600 focus:ring-coral-500;
    }
    .coral-text {
      @apply text-coral-400;
    }
    .coral-border {
      @apply border-coral-400;
    }
  `]
})
export class PaymentComponent {
  private router = inject(Router);
  private cartService = inject(CartStateService);

  isProcessing = false;

  get cartTotal() {
    return this.cartService.price();
  }

  get totalWithTax() {
    return this.cartTotal * 1.21;
  }

  processPayment() {
    this.isProcessing = true;
    
    // Simulate processing delay
    setTimeout(() => {
      this.isProcessing = false;
      // Show demo error alert
      alert('❌ Error de Conexión\n\nEsto es solo una demostración. La pasarela de pago no está conectada a un procesador real.\n\nEn una implementación real, aquí se procesaría el pago de forma segura.');
    }, 2000);
  }

  cancelPayment() {
    this.router.navigate(['/cart']);
  }

  goBackToCheckout() {
    this.router.navigate(['/checkout']);
  }
}
