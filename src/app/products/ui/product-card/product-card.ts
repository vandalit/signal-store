/*
╔══════════════════════════════════════════════════════════════════════════════╗
║                            PRODUCT CARD COMPONENT                           ║
║                     Presentation Component & Event Handling                 ║
╚══════════════════════════════════════════════════════════════════════════════╝

📚 LEARNING OBJECTIVES:
- Understanding presentation (dumb) components
- Using Angular's new input/output signal functions
- Event handling and propagation control
- Component communication patterns
- Separation of concerns in component architecture

🎯 KEY CONCEPTS DEMONSTRATED:
- Signal-based inputs with input.required()
- Type-safe outputs with output<T>()
- Event bubbling prevention
- Component reusability patterns
- Template-driven UI components
*/

// ═══════════════════════════════════════════════════════════════════════════════
// 📦 IMPORTS SECTION
// ═══════════════════════════════════════════════════════════════════════════════
import { Component, input, output } from '@angular/core';
import { Product } from '../../../shared/interfaces/product.interface';
import { RouterLink } from '@angular/router';

// ═══════════════════════════════════════════════════════════════════════════════
// 🎴 PRESENTATION COMPONENT DEFINITION
// ═══════════════════════════════════════════════════════════════════════════════
/**
 * 🎓 EDUCATIONAL NOTE: Presentation Component Pattern
 * 
 * This component follows the "dumb/presentation" component pattern:
 * - Receives data through inputs
 * - Emits events through outputs
 * - Contains minimal business logic
 * - Focuses on UI presentation
 * - Highly reusable and testable
 * 
 * 🔍 Benefits of this pattern:
 * - Clear separation of concerns
 * - Easy to test in isolation
 * - Reusable across different contexts
 * - Predictable data flow
 */
@Component({
  selector: 'app-product-card',
  standalone: true, // 🎯 Standalone component for modularity
  imports: [RouterLink], // 📥 Only import what we need for navigation
  templateUrl: './product-card.html',
  styles: `` // 🎨 Styles defined in template with Tailwind CSS
})
export class ProductCard {
  
  // ───────────────────────────────────────────────────────────────────────────
  // 📥 INPUT PROPERTIES - DATA FLOW IN
  // ───────────────────────────────────────────────────────────────────────────
  /**
   * 🎓 LEARNING: Signal-based Inputs (Angular 17+)
   * 
   * The new input.required() function creates a signal-based input:
   * - Type-safe with TypeScript generics
   * - Required inputs enforce data contracts
   * - Automatic change detection
   * - Better performance than traditional @Input
   * 
   * 🔍 Why signal inputs?
   * - Reactive by default
   * - No need for OnChanges lifecycle hook
   * - Automatic dependency tracking
   * - Better integration with computed signals
   */
  product = input.required<Product>();
  
  // ───────────────────────────────────────────────────────────────────────────
  // 📤 OUTPUT PROPERTIES - EVENT FLOW OUT
  // ───────────────────────────────────────────────────────────────────────────
  /**
   * 🎓 LEARNING: Signal-based Outputs (Angular 17+)
   * 
   * The new output<T>() function creates a type-safe event emitter:
   * - Type-safe event payload with generics
   * - Cleaner syntax than EventEmitter
   * - Better tree-shaking and performance
   * - Integrates well with signal-based architecture
   * 
   * 🔍 Component Communication Pattern:
   * Parent Component → Input → Child Component → Output → Parent Component
   */
  addToCart = output<Product>();
  
  // ───────────────────────────────────────────────────────────────────────────
  // 🎬 EVENT HANDLERS
  // ───────────────────────────────────────────────────────────────────────────
  /**
   * 🎓 LEARNING: Event Handling Best Practices
   * 
   * This method demonstrates proper event handling:
   * - stopPropagation() prevents event bubbling
   * - preventDefault() prevents default browser behavior
   * - Emits the product data to parent component
   * 
   * 🔍 Why control event propagation?
   * - Prevents unintended navigation when clicking the button
   * - Ensures only the intended action occurs
   * - Provides better user experience
   * - Prevents conflicts with parent element events
   */
  add(event: Event) {
    // 🛑 Stop the event from bubbling up to parent elements
    // This prevents the card's navigation from triggering
    event.stopPropagation();
    
    // 🛑 Prevent any default browser behavior
    // Ensures our custom logic is the only thing that runs
    event.preventDefault();
    
    // 📤 Emit the product to the parent component
    // Parent component will handle the actual cart logic
    this.addToCart.emit(this.product());  
  }
}

/*
╔══════════════════════════════════════════════════════════════════════════════╗
║                            📚 LEARNING SUMMARY                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║ 🎯 Key Concepts Covered:                                                    ║
║   • Presentation component pattern (dumb component)                         ║
║   • Signal-based inputs with input.required<T>()                            ║
║   • Type-safe outputs with output<T>()                                      ║
║   • Event handling and propagation control                                  ║
║   • Component communication through inputs/outputs                          ║
║   • Separation of concerns in component architecture                        ║
║                                                                              ║
║ 🏗️ Architecture Benefits:                                                   ║
║   • Highly reusable component design                                        ║
║   • Clear data flow patterns                                                ║
║   • Easy to test in isolation                                               ║
║   • Minimal business logic in presentation layer                            ║
║   • Type-safe component contracts                                           ║
║                                                                              ║
║ 🎨 UI/UX Considerations:                                                     ║
║   • Proper event handling prevents UI conflicts                             ║
║   • Clean separation between navigation and actions                         ║
║   • Predictable user interactions                                           ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
*/
