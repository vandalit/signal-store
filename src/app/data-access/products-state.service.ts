import { Injectable, inject } from "@angular/core";
import { Product } from "../shared/interfaces/product.interface";
import { ProductsService, PaginatedResponse } from "./products.service";
import { signalSlice } from 'ngxtension/signal-slice';
import { map, startWith, switchMap } from "rxjs/operators";
import { Subject, of } from "rxjs";
import { catchError } from 'rxjs/operators';

interface State {
    products: Product[];
    status: 'loading' | 'success' | 'error';
    currentPage: number;
    totalItems: number;
    totalPages: number;
    itemsPerPage: number;
}

@Injectable()
export class ProductsStateService {
    private productsService = inject(ProductsService);
    
    private initialState: State = {
        products: [],
        status: 'loading' as const,
        currentPage: 1,
        totalItems: 0,
        totalPages: 0,
        itemsPerPage: 8,
    };

    changePage$ = new Subject<number>();

    loadProducts$ = this.changePage$.pipe(
        startWith(1),
        switchMap((page) => this.productsService.getProducts(page)),
        map((response: PaginatedResponse<Product>) => ({
            products: response.data,
            status: 'success' as const,
            currentPage: response.page,
            totalItems: response.total,
            totalPages: response.totalPages,
            itemsPerPage: response.limit
        })),
        catchError(() => { 
            return of({ 
                products: [], 
                status: 'error' as const,
                currentPage: 1,
                totalItems: 0,
                totalPages: 0,
                itemsPerPage: 8
            });
        }),
    );

    state = signalSlice({
        initialState: this.initialState,
        sources: [
            this.changePage$.pipe(
                map(page => ({ currentPage: page, status: 'loading' as const })),
            ),
            this.loadProducts$,
        ],
    });
}

