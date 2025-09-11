/*
╔══════════════════════════════════════════════════════════════════════════════╗
║                           CART STATE SERVICE                                ║
║                     Angular Signals & State Management                      ║
╚══════════════════════════════════════════════════════════════════════════════╝

📚 LEARNING OBJECTIVES:
- Understanding Angular Signals and reactive state management
- Using ngxtension/signal-slice for complex state operations
- Implementing computed signals for derived data
- Managing side effects with RxJS operators
- Dependency injection patterns in Angular services

🎯 KEY CONCEPTS DEMONSTRATED:
- Signal-based state management (Angular 16+)
- Reactive programming with RxJS
- Immutable state updates
- Local storage persistence
- Service composition with dependency injection
*/

// ═══════════════════════════════════════════════════════════════════════════════
// 📦 IMPORTS SECTION
// ═══════════════════════════════════════════════════════════════════════════════
import { computed, inject, Injectable, Signal } from "@angular/core";
import { ProductItemCart } from "../interfaces/product.interface";
import { signalSlice } from "ngxtension/signal-slice"; // Third-party library for advanced signal operations
import { map, Observable } from "rxjs";
import { StorageService } from "./storage.service";

// ═══════════════════════════════════════════════════════════════════════════════
// 🏗️ STATE INTERFACE DEFINITION
// ═══════════════════════════════════════════════════════════════════════════════
/**
 * 📋 Cart State Interface
 * Defines the shape of our cart state for type safety
 * 
 * @interface State
 * @property {ProductItemCart[]} products - Array of products in the cart
 * @property {boolean} loaded - Flag to track if data has been loaded from storage
 */
interface State {
    products: ProductItemCart[];
    loaded: boolean;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 🛒 CART STATE SERVICE CLASS
// ═══════════════════════════════════════════════════════════════════════════════
/**
 * 🎓 EDUCATIONAL NOTE: Injectable Service
 * 
 * This service demonstrates several advanced Angular concepts:
 * 1. Dependency Injection with 'providedIn: root' (Singleton pattern)
 * 2. Signal-based state management for reactive UI updates
 * 3. RxJS integration for asynchronous operations
 * 4. Immutable state updates following functional programming principles
 */
@Injectable({
    providedIn: "root", // 🔍 Makes this service available app-wide as a singleton
})
export class CartStateService {
    
    // ───────────────────────────────────────────────────────────────────────────
    // 💉 DEPENDENCY INJECTION
    // ───────────────────────────────────────────────────────────────────────────
    /**
     * 🎓 LEARNING: Modern Angular Dependency Injection
     * Using the 'inject()' function instead of constructor injection
     * This is the new recommended approach in Angular 14+
     */
    private _storageService = inject(StorageService);

    // ───────────────────────────────────────────────────────────────────────────
    // 🏁 INITIAL STATE DEFINITION
    // ───────────────────────────────────────────────────────────────────────────
    /**
     * 📝 Initial state of the cart
     * Always start with an empty cart and loaded = false
     * This ensures predictable behavior on app startup
     */
    private initialState: State = {
        products: [],
        loaded: false,
    };

    // ───────────────────────────────────────────────────────────────────────────
    // 📡 DATA LOADING STREAM
    // ───────────────────────────────────────────────────────────────────────────
    /**
     * 🎓 LEARNING: RxJS Observable Stream
     * This observable loads products from localStorage and transforms the data
     * The 'map' operator transforms the loaded products into our state shape
     */
    loadProducts$ = this._storageService
        .loadProducts()
        .pipe(map((products) => ({ products, loaded: true })));

    // ───────────────────────────────────────────────────────────────────────────
    // 🔄 SIGNAL SLICE - ADVANCED STATE MANAGEMENT
    // ───────────────────────────────────────────────────────────────────────────
    /**
     * 🎓 LEARNING: signalSlice from ngxtension
     * 
     * This creates a reactive state slice with:
     * - initialState: Starting point for our state
     * - sources: Observable streams that update the state
     * - actionSources: User-triggered actions that modify state
     * - effects: Side effects that run when state changes
     * 
     * 🔍 Why use signalSlice?
     * - Combines the power of RxJS with Angular Signals
     * - Provides a Redux-like pattern with less boilerplate
     * - Automatic change detection and UI updates
     */
    state = signalSlice({
        initialState: this.initialState,
        sources: [this.loadProducts$], // 📥 Auto-load products on service initialization
       
        // 🎬 ACTION SOURCES - User-triggered state changes
        actionSources: {
            /**
             * 🛒 ADD TO CART ACTION
             * Handles adding products to the cart with automatic persistence
             * 
             * @param state - Current state signal
             * @param action$ - Observable stream of ProductItemCart to add
             * @returns Observable that emits the new state
             */
            add: (state, action$: Observable<ProductItemCart>) =>
                action$.pipe(
                    map((product) => {
                        // 🔄 Create new state immutably
                        const newState = this.add(state, product);
                        
                        // 💾 SIDE EFFECT: Save to localStorage immediately
                        // This ensures data persistence without waiting for effects
                        this._storageService.saveProducts(newState.products);
                        console.log('🛒 Product added to cart and saved:', newState.products);
                        
                        return newState;
                    })
                ),
            remove: (state, action$: Observable<number>) => action$.pipe(
                map((id) => {
                    // 🔄 Create new state immutably
                    const newState = this.remove(state, id);
                    
                    // 💾 SIDE EFFECT: Save to localStorage immediately
                    // This ensures data persistence without waiting for effects
                    this._storageService.saveProducts(newState.products);
                    console.log('🛒 Product removed from cart and saved:', newState.products);
                    
                    return newState;
                })
            ),
            update: (state, action$: Observable<ProductItemCart>) => action$.pipe(
                map((product) => {
                    // 🔄 Create new state immutably
                    const newState = this.update(state, product);
                    
                    // 💾 SIDE EFFECT: Save to localStorage immediately
                    // This ensures data persistence without waiting for effects
                    this._storageService.saveProducts(newState.products);
                    console.log('🛒 Product updated in cart and saved:', newState.products);
                    
                    return newState;
                })
            )

        },
        
        // ⚡ EFFECTS - Side effects that run based on state changes
        effects: (state) => ({
            /**
             * 💾 SAVE PRODUCTS EFFECT
             * Automatically saves products to localStorage when state changes
             * Only runs when data has been loaded to avoid saving empty state
             */
            saveProducts: () => {
                if (state.loaded()) {
                    this._storageService.saveProducts(state().products);
                    console.log('💾 Products saved to localStorage:', state().products);
                }
            }
        })
    });

    // ───────────────────────────────────────────────────────────────────────────
    // 🧮 COMPUTED SIGNALS - DERIVED STATE
    // ───────────────────────────────────────────────────────────────────────────
    /**
     * 🎓 LEARNING: Computed Signals
     * 
     * Computed signals automatically recalculate when their dependencies change
     * This creates a reactive count that updates whenever the cart changes
     * 
     * 🔍 Why computed signals?
     * - Automatic dependency tracking
     * - Memoized results (only recalculates when needed)
     * - Type-safe and performant
     * - Integrates seamlessly with Angular's change detection
     */
    count = computed(() => 
        this.state().products.reduce((total, item) => total + item.quantity, 0)
    );

    /**
     * 🎓 LEARNING: Price Computed Signal
     * 
     * Calculates the total price of all items in the cart
     * Multiplies each product's price by its quantity and sums them up
     */
    price = computed(() => 
        this.state().products.reduce((total, item) => total + (item.product.price * item.quantity), 0)
    );

    // ───────────────────────────────────────────────────────────────────────────
    // 🔧 PRIVATE HELPER METHODS
    // ───────────────────────────────────────────────────────────────────────────
    /**
     * 🎓 LEARNING: Immutable State Updates
     * 
     * This method demonstrates functional programming principles:
     * - Never mutate existing state directly
     * - Always return a new state object
     * - Use spread operator for immutable updates
     * 
     * @param state - Current state signal
     * @param product - Product to add to cart
     * @returns New state with the product added or quantity updated
     */
    private add(state: Signal<State>, product: ProductItemCart): State {
        // 🔍 Check if product already exists in cart
        const isIncart = state().products.find(
            (productInCart) => productInCart.product.id === product.product.id
        );

        // 📦 If product is new, add it to the cart
        if (!isIncart) {
            return {
                products: [...state().products, { ...product, quantity: 1 }], // 🔄 Immutable array update
                loaded: state().loaded
            };
        }

        // ➕ If product exists, increment its quantity
        isIncart.quantity += 1;
        return {
            products: [...state().products], // 🔄 Create new array reference
            loaded: state().loaded
        };
    }
    private remove(state: Signal<State>, id: number): State {
        return {
            products: state().products.filter(
                (product) => product.product.id !== id
            ),
            loaded: state().loaded
        };
    }
    private update(state: Signal<State>, product: ProductItemCart): State {
        return {
            products: state().products.map(
                (productInCart) =>
                    productInCart.product.id === product.product.id
                        ? { ...productInCart, quantity: product.quantity }
                        : productInCart
            ),
            loaded: state().loaded
        };
    }
}

/*
╔══════════════════════════════════════════════════════════════════════════════╗
║                            📚 LEARNING SUMMARY                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║ 🎯 Key Concepts Covered:                                                    ║
║   • Angular Signals for reactive state management                           ║
║   • RxJS Observables for asynchronous data handling                         ║
║   • Dependency injection with the inject() function                         ║
║   • Immutable state updates for predictable behavior                        ║
║   • Computed signals for derived data                                       ║
║   • Side effects management with automatic persistence                      ║
║                                                                              ║
║ 🔧 Advanced Patterns:                                                       ║
║   • signalSlice for complex state management                                ║
║   • Functional programming principles                                       ║
║   • Separation of concerns (state vs. persistence)                          ║
║   • Type safety with TypeScript interfaces                                  ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
*/