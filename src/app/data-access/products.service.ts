import { Injectable } from "@angular/core";
import { BaseHttpService } from "../shared/data-access/base-http.service";
import { Observable } from "rxjs";
import { Product } from "../shared/interfaces/product.interface";
import { map, shareReplay } from "rxjs/operators";

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

@Injectable({providedIn: 'root'})
export class ProductsService extends BaseHttpService {
    
    private readonly ITEMS_PER_PAGE = 8; // Better fit for 20 total products
    
    // Cache all products to avoid multiple API calls
    private allProducts$: Observable<Product[]> | null = null;
    
    /**
     * Get all products and cache the result
     * FakeStore API doesn't support real pagination, so we fetch all and paginate client-side
     */
    private getAllProducts(): Observable<Product[]> {
        if (!this.allProducts$) {
            this.allProducts$ = this.http.get<Product[]>(`${this.apiUrl}/products`).pipe(
                shareReplay(1) // Cache the result
            );
        }
        return this.allProducts$;
    }
    
    /**
     * Get paginated products with client-side pagination
     * @param page - Current page number (1-based)
     * @returns Observable with paginated response
     */
    getProducts(page: number = 1): Observable<PaginatedResponse<Product>> {
        return this.getAllProducts().pipe(
            map(allProducts => {
                const total = allProducts.length;
                const totalPages = Math.ceil(total / this.ITEMS_PER_PAGE);
                const startIndex = (page - 1) * this.ITEMS_PER_PAGE;
                const endIndex = startIndex + this.ITEMS_PER_PAGE;
                const paginatedProducts = allProducts.slice(startIndex, endIndex);
                
                return {
                    data: paginatedProducts,
                    total: total,
                    page: page,
                    limit: this.ITEMS_PER_PAGE,
                    totalPages: totalPages
                };
            })
        );
    }
    
    getProduct(id: string): Observable<Product> {
        return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
    }
}
