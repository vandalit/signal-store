import { computed, inject, Injectable, Signal } from "@angular/core";
import { ProductItemCart } from "../interfaces/product.interface";
import { signalSlice } from "ngxtension/signal-slice";
import { map, Observable } from "rxjs";
import { StorageService } from "./storage.service";

interface State {
    products: ProductItemCart[];
    loaded: boolean;
}

@Injectable({
    providedIn: "root",
})
export class CartStateService {
    private _storageService = inject(StorageService);

    private initialState: State = {
        products: [],
        loaded: false,
    };

    loadProducts$ = this._storageService
        .loadProducts()
        .pipe(map((products) => ({ products, loaded: true })));

    state = signalSlice({
        initialState: this.initialState,
        sources: [this.loadProducts$],
        actionSources: {
            add: (state, action$: Observable<ProductItemCart>) =>
                action$.pipe(
                    map((product) => {
                        const newState = this.add(state, product);
                        // Guardar inmediatamente después de añadir
                        this._storageService.saveProducts(newState.products);
                        console.log('Product added to cart and saved:', newState.products);
                        return newState;
                    })
                )
        },
        effects: (state) => ({
            saveProducts: () => {
                if (state.loaded()) {
                    this._storageService.saveProducts(state().products);
                    console.log('Products saved to localStorage:', state().products);
                }
            }
        })
    });

    // Computed signal for cart count
    count = computed(() => 
        this.state().products.reduce((total, item) => total + item.quantity, 0)
    );

    private add(state: Signal<State>, product: ProductItemCart): State {
        const isIncart = state().products.find(
            (productInCart) => productInCart.product.id === product.product.id
        );

        if (!isIncart) {
            return {
                products: [...state().products, { ...product, quantity: 1 }],
                loaded: state().loaded
            };
        }

        isIncart.quantity += 1;
        return {
            products: [...state().products],
            loaded: state().loaded
        };
    }
}