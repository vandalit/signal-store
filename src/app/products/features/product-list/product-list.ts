/*
╔══════════════════════════════════════════════════════════════════════════════╗
║                           PRODUCT LIST COMPONENT                            ║
║                      Smart Component & State Management                      ║
╚══════════════════════════════════════════════════════════════════════════════╝

📚 LEARNING OBJECTIVES:
- Understanding smart (container) components
- Service injection and state management
- Component communication with child components
- Reactive data flow with signals
- Pagination and data loading patterns

🎯 KEY CONCEPTS DEMONSTRATED:
- Smart component pattern (container component)
- Multiple service injection and coordination
- Event handling from child components
- State management with reactive services
- Template control flow (@switch, @for)
*/

// ═══════════════════════════════════════════════════════════════════════════════
// 📦 IMPORTS SECTION
// ═══════════════════════════════════════════════════════════════════════════════
import { Component, inject } from '@angular/core';
import { ProductsStateService } from '../../../data-access/products-state.service';
import { ProductCard } from '../../ui/product-card/product-card';
import { CartStateService } from '../../../shared/data-access/cart-state.service';
import { Product } from '../../../shared/interfaces/product.interface';

// ═══════════════════════════════════════════════════════════════════════════════
// 🧠 SMART COMPONENT DEFINITION
// ═══════════════════════════════════════════════════════════════════════════════
/**
 * 🎓 EDUCATIONAL NOTE: Smart Component Pattern
 * 
 * This component follows the "smart/container" component pattern:
 * - Manages application state and business logic
 * - Coordinates multiple services
 * - Handles data fetching and state updates
 * - Passes data down to presentation components
 * - Handles events from child components
 * 
 * 🔍 Key characteristics:
 * - Contains business logic
 * - Manages multiple service dependencies
 * - Orchestrates data flow
 * - Minimal UI concerns
 */
@Component({
  selector: 'app-product-list',
  standalone: true, // 🎯 Standalone component architecture
  imports: [ProductCard], // 📥 Import child components
  templateUrl: './product-list.html',
  providers: [ProductsStateService], // 🔧 Component-level service provider
})

/**
 * 🎓 LEARNING: Default Export for Lazy Loading
 * 
 * Using default export enables lazy loading:
 * - Smaller initial bundle size
 * - Better performance for large applications
 * - Code splitting at the route level
 * - Dynamic imports in routing configuration
 */
export default class ProductList {
  
  // ───────────────────────────────────────────────────────────────────────────
  // 💉 SERVICE DEPENDENCIES
  // ───────────────────────────────────────────────────────────────────────────
  /**
   * 🎓 LEARNING: Multiple Service Injection
   * 
   * This component demonstrates coordinating multiple services:
   * - ProductsStateService: Manages product data and loading states
   * - CartStateService: Manages shopping cart state
   * 
   * 🔍 Service Coordination Patterns:
   * - Each service has a single responsibility
   * - Services communicate through reactive streams
   * - Component orchestrates the interaction
   */
  productState = inject(ProductsStateService);
  private cartService = inject(CartStateService);

  // ───────────────────────────────────────────────────────────────────────────
  // 🎬 USER INTERACTION HANDLERS
  // ───────────────────────────────────────────────────────────────────────────
  /**
   * 🎓 LEARNING: Pagination Pattern
   * 
   * This method demonstrates reactive pagination:
   * - Reads current page from state signal
   * - Increments page number
   * - Triggers data reload through reactive stream
   * 
   * 🔍 Reactive Pattern Benefits:
   * - Automatic UI updates when state changes
   * - Centralized loading state management
   * - Error handling in one place
   */
  changePage() {
    const page = this.productState.state.page() + 1;
    this.productState.changePage$.next(page);
  }

  /**
   * 🎓 LEARNING: Event Handler from Child Component
   * 
   * This method handles the addToCart event from ProductCard:
   * - Receives product data from child component
   * - Transforms data to match cart requirements
   * - Delegates to cart service for state management
   * 
   * 🔍 Component Communication Flow:
   * ProductCard (emit) → ProductList (handle) → CartService (update state)
   */
  addToCart(product: Product) {
    // 🛒 Transform product data for cart
    // The cart expects ProductItemCart format with quantity
    this.cartService.state.add({
      product, 
      quantity: 1,
    });
    
    // 📝 Development logging for debugging
    console.log('🛒 Adding product to cart:', product.title);
  }
}

/*
╔══════════════════════════════════════════════════════════════════════════════╗
║                            📚 LEARNING SUMMARY                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║ 🎯 Key Concepts Covered:                                                    ║
║   • Smart component pattern (container component)                           ║
║   • Multiple service injection and coordination                             ║
║   • Event handling from child components                                    ║
║   • Reactive pagination with signal-based state                             ║
║   • Data transformation between component layers                            ║
║   • Component-level service providers                                       ║
║                                                                              ║
║ 🏗️ Architecture Benefits:                                                   ║
║   • Clear separation between smart and dumb components                      ║
║   • Centralized business logic management                                   ║
║   • Reactive data flow with automatic UI updates                            ║
║   • Lazy loading support with default exports                               ║
║   • Service composition for complex features                                ║
║                                                                              ║
║ 🔄 Data Flow Pattern:                                                       ║
║   Services → Smart Component → Dumb Components → User Events → Services     ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
*/