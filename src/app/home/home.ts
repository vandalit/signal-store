import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../data-access/products.service';
import { Product } from '../shared/interfaces/product.interface';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styles: [`
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class HomeComponent implements OnInit {
  private productsService = inject(ProductsService);
  
  featuredProducts$!: Observable<Product[]>;
  categoryProducts$!: Observable<any[]>;

  ngOnInit() {
    // Get all products and use them for featured section
    this.featuredProducts$ = this.productsService.getProducts(1).pipe(
      map(response => response.data)
    );

    // Group products by category for category section
    this.categoryProducts$ = this.productsService.getProducts(1).pipe(
      map(response => {
        const products = response.data;
        const categories = products.reduce((acc: any, product: Product) => {
          const category = product.category;
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(product);
          return acc;
        }, {});

        return Object.keys(categories).map(categoryName => ({
          name: categoryName,
          displayName: this.getCategoryDisplayName(categoryName),
          count: categories[categoryName].length,
          products: categories[categoryName].slice(0, 4) // Show max 4 products per category
        }));
      })
    );
  }

  private getCategoryDisplayName(category: string): string {
    const displayNames: { [key: string]: string } = {
      "electronics": "Electrónicos",
      "jewelery": "Joyería", 
      "men's clothing": "Ropa Masculina",
      "women's clothing": "Ropa Femenina"
    };
    return displayNames[category] || category;
  }

  navigateToProducts() {
    // This will be handled by RouterLink, but we can add analytics here if needed
  }
}
