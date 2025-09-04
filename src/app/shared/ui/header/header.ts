/*
╔══════════════════════════════════════════════════════════════════════════════╗
║                            HEADER COMPONENT                                 ║
║                    Standalone Component & Navigation                         ║
╚══════════════════════════════════════════════════════════════════════════════╝

📚 LEARNING OBJECTIVES:
- Understanding standalone components (Angular 14+)
- Implementing responsive navigation with Tailwind CSS
- Using Angular Router for navigation and active states
- Integrating with reactive state management
- Creating conditional rendering with control flow

🎯 KEY CONCEPTS DEMONSTRATED:
- Standalone component architecture
- Router integration (RouterLink, RouterLinkActive)
- Dependency injection in components
- Computed signals for reactive UI updates
- Conditional rendering with @if control flow
- Responsive design with Tailwind CSS
*/

// ═══════════════════════════════════════════════════════════════════════════════
// 📦 IMPORTS SECTION
// ═══════════════════════════════════════════════════════════════════════════════
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartStateService } from '../../data-access/cart-state.service';

// ═══════════════════════════════════════════════════════════════════════════════
// 🧩 STANDALONE COMPONENT DEFINITION
// ═══════════════════════════════════════════════════════════════════════════════
/**
 * 🎓 EDUCATIONAL NOTE: Standalone Components
 * 
 * This component demonstrates the new standalone component architecture:
 * - No need for NgModule declarations
 * - Self-contained with its own imports
 * - Easier to test and reuse
 * - Simplified component tree
 * 
 * 🔍 Key Features:
 * - Responsive navigation bar
 * - Active route highlighting
 * - Real-time cart counter
 * - Mobile-friendly design
 */
@Component({
  selector: 'app-header',
  standalone: true, // 🎯 Makes this component standalone (no NgModule needed)
  imports: [RouterLink, RouterLinkActive], // 📥 Only import what we need
  template: `
    <!-- ═══════════════════════════════════════════════════════════════════════ -->
    <!-- 🏠 MAIN HEADER CONTAINER                                                -->
    <!-- ═══════════════════════════════════════════════════════════════════════ -->
    <header class="bg-white shadow-sm border-b">
      
      <!-- ─────────────────────────────────────────────────────────────────── -->
      <!-- 🧭 NAVIGATION CONTAINER                                             -->
      <!-- ─────────────────────────────────────────────────────────────────── -->
      <nav class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          
          <!-- ───────────────────────────────────────────────────────────── -->
          <!-- 🏷️ BRAND & NAVIGATION LINKS                                   -->
          <!-- ───────────────────────────────────────────────────────────── -->
          <div class="flex items-center space-x-8">
            <!-- 
            🎓 LEARNING: RouterLink Directive
            - Declarative navigation without page reloads
            - Automatically handles route changes
            - Integrates with Angular's change detection
            -->
            <a routerLink="/" class="text-2xl font-bold text-gray-900">
              Signal Store
            </a>
            
            <!-- 
            🎓 LEARNING: Responsive Design
            - hidden md:flex = Hidden on mobile, flex on medium screens+
            - This creates a mobile-first responsive navigation
            -->
            <div class="hidden md:flex space-x-6">
              <!-- 
              🎓 LEARNING: RouterLinkActive Directive
              - Automatically applies classes when route is active
              - Provides visual feedback for current page
              - Enhances user experience and navigation clarity
              -->
              <a routerLink="/products" 
                 routerLinkActive="text-blue-600 border-b-2 border-blue-600"
                 class="text-gray-700 hover:text-blue-600 transition-colors pb-1">
                Productos
              </a>
            </div>
          </div>
          
          <!-- ───────────────────────────────────────────────────────────── -->
          <!-- 🛒 CART & USER ACTIONS                                        -->
          <!-- ───────────────────────────────────────────────────────────── -->
          <div class="flex items-center space-x-4">
            <!-- 
            🎓 LEARNING: Relative Positioning for Badge
            - relative class enables absolute positioning of child elements
            - Perfect for notification badges and overlays
            -->
            <a routerLink="/cart" 
               routerLinkActive="text-blue-600"
               class="relative text-gray-700 hover:text-blue-600 transition-colors">
              
              <!-- 🛒 Shopping Cart Icon (SVG) -->
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
                   fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" 
                   stroke-linejoin="round" class="w-6 h-6">
                <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M17 17h-11v-14h-2" />
                <path d="M6 5l14 1l-1 7h-13" />
              </svg>
              
              <!-- 
              🎓 LEARNING: Conditional Rendering with @if
              - New Angular 17+ control flow syntax
              - More intuitive than *ngIf structural directive
              - Better performance and type safety
              - Reactive updates when cartCount() changes
              -->
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
  styles: `` // 🎨 Using Tailwind CSS for styling, no custom CSS needed
})

// ═══════════════════════════════════════════════════════════════════════════════
// 🏗️ COMPONENT CLASS DEFINITION
// ═══════════════════════════════════════════════════════════════════════════════
/**
 * 🎓 EDUCATIONAL NOTE: Component Architecture
 * 
 * This class demonstrates modern Angular component patterns:
 * - Minimal component logic (presentation focused)
 * - Dependency injection for state access
 * - Computed signals for reactive data
 * - Separation of concerns (UI vs. business logic)
 */
export class Header {
  
  // ───────────────────────────────────────────────────────────────────────────
  // 💉 DEPENDENCY INJECTION
  // ───────────────────────────────────────────────────────────────────────────
  /**
   * 🎓 LEARNING: Service Injection in Components
   * 
   * Using the inject() function for dependency injection:
   * - Modern alternative to constructor injection
   * - More flexible and functional approach
   * - Better tree-shaking and bundle optimization
   * - Cleaner component code
   */
  private cartService = inject(CartStateService);
  
  // ───────────────────────────────────────────────────────────────────────────
  // 🔄 REACTIVE PROPERTIES
  // ───────────────────────────────────────────────────────────────────────────
  /**
   * 🎓 LEARNING: Computed Signal Integration
   * 
   * This property exposes the cart count as a computed signal:
   * - Automatically updates when cart state changes
   * - No manual subscription management needed
   * - Type-safe and performant
   * - Integrates seamlessly with Angular's change detection
   * 
   * 🔍 Why use computed signals in components?
   * - Automatic reactivity without OnPush complexity
   * - No memory leaks (no manual unsubscription)
   * - Better performance than traditional observables
   * - Cleaner template syntax
   */
  cartCount = this.cartService.count;
}

/*
╔══════════════════════════════════════════════════════════════════════════════╗
║                            📚 LEARNING SUMMARY                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║ 🎯 Key Concepts Covered:                                                    ║
║   • Standalone component architecture                                       ║
║   • Angular Router integration (RouterLink, RouterLinkActive)               ║
║   • Responsive design with Tailwind CSS                                     ║
║   • Conditional rendering with @if control flow                             ║
║   • Computed signals for reactive UI updates                                ║
║   • Modern dependency injection patterns                                    ║
║                                                                              ║
║ 🎨 UI/UX Patterns:                                                          ║
║   • Mobile-first responsive navigation                                      ║
║   • Visual feedback for active routes                                       ║
║   • Notification badges with absolute positioning                           ║
║   • Hover effects and smooth transitions                                    ║
║   • Semantic HTML structure for accessibility                               ║
║                                                                              ║
║ 🔧 Technical Highlights:                                                    ║
║   • No NgModule dependencies (standalone)                                   ║
║   • Minimal component logic (presentation focused)                          ║
║   • Automatic reactivity without subscriptions                              ║
║   • Type-safe template expressions                                          ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
*/
