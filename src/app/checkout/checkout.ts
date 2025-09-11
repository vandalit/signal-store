import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartStateService } from '../shared/data-access/cart-state.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './checkout.html',
  styles: [`
    .form-input {
      @apply block w-full px-4 py-3 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-colors duration-200 placeholder-gray-500;
    }
    .form-input:invalid {
      @apply border-red-300 focus:ring-red-500 focus:border-red-500;
    }
    .form-label {
      @apply block text-sm font-semibold text-gray-900 mb-2;
    }
    .form-group {
      @apply space-y-2;
    }
    .form-error {
      @apply text-sm text-red-600 mt-1;
    }
  `]
})
export class CheckoutComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private cartService = inject(CartStateService);

  checkoutForm!: FormGroup;
  currentStep = 1;
  totalSteps = 3;

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.checkoutForm = this.fb.group({
      // Customer Information
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
      
      // Shipping Address
      address: ['', [Validators.required, Validators.minLength(5)]],
      city: ['', [Validators.required, Validators.minLength(2)]],
      state: ['', [Validators.required]],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}(-\d{4})?$/)]],
      country: ['Argentina', [Validators.required]],
      
      // Payment Method
      paymentMethod: ['credit-card', [Validators.required]],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
      cardName: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  get cartState() {
    return this.cartService.state();
  }

  get cartItems() {
    return this.cartState.products;
  }

  get cartTotal() {
    return this.cartService.price();
  }

  get cartCount() {
    return this.cartService.count();
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  goToStep(step: number) {
    this.currentStep = step;
  }

  isStepValid(step: number): boolean {
    switch (step) {
      case 1:
        return this.checkoutForm.get('firstName')?.valid && 
               this.checkoutForm.get('lastName')?.valid && 
               this.checkoutForm.get('email')?.valid && 
               this.checkoutForm.get('phone')?.valid || false;
      case 2:
        return this.checkoutForm.get('address')?.valid && 
               this.checkoutForm.get('city')?.valid && 
               this.checkoutForm.get('state')?.valid && 
               this.checkoutForm.get('zipCode')?.valid || false;
      case 3:
        return this.checkoutForm.get('cardNumber')?.valid && 
               this.checkoutForm.get('expiryDate')?.valid && 
               this.checkoutForm.get('cvv')?.valid && 
               this.checkoutForm.get('cardName')?.valid || false;
      default:
        return false;
    }
  }

  proceedToPayment() {
    if (this.checkoutForm.valid) {
      this.router.navigate(['/checkout/payment']);
    }
  }

  cancelCheckout() {
    this.router.navigate(['/cart']);
  }
}
