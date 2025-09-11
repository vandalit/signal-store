/*
╔══════════════════════════════════════════════════════════════════════════════╗
║                           PAGINATION COMPONENT                              ║
║                     Reusable UI Component for Pagination                    ║
╚══════════════════════════════════════════════════════════════════════════════╝

📚 LEARNING OBJECTIVES:
- Creating reusable UI components
- Input/Output patterns for component communication
- Pagination logic and calculations
- Accessibility best practices
- Modern Angular signal-based inputs/outputs

🎯 KEY CONCEPTS DEMONSTRATED:
- Signal-based inputs and outputs
- Computed properties for derived data
- Event handling and propagation
- Responsive design with Tailwind CSS
- Component reusability patterns
*/

import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface PaginationInfo {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
}

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6" aria-label="Pagination">
      <div class="hidden sm:block">
        <p class="text-sm text-gray-700">
          Mostrando
          <span class="font-medium">{{ startItem() }}</span>
          a
          <span class="font-medium">{{ endItem() }}</span>
          de
          <span class="font-medium">{{ totalItems() }}</span>
          resultados
        </p>
      </div>
      <div class="flex flex-1 justify-between sm:justify-end">
        <!-- Previous Button -->
        <button
          type="button"
          (click)="goToPrevious()"
          [disabled]="currentPage() === 1"
          [class]="previousButtonClass()"
          class="relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
          </svg>
          Anterior
        </button>

        <!-- Page Numbers (Desktop) -->
        <div class="hidden md:flex md:items-center md:space-x-1 mx-4">
          @for (page of visiblePages(); track page) {
            @if (page === '...') {
              <span class="px-3 py-2 text-sm text-gray-500">...</span>
            } @else {
              <button
                type="button"
                (click)="goToPage(+page)"
                [class]="getPageButtonClass(+page)"
                class="relative inline-flex items-center px-3 py-2 text-sm font-semibold ring-1 ring-inset focus-visible:outline-offset-0"
              >
                {{ page }}
              </button>
            }
          }
        </div>

        <!-- Current Page Indicator (Mobile) -->
        <div class="md:hidden flex items-center mx-4">
          <span class="text-sm text-gray-700">
            Página {{ currentPage() }} de {{ totalPages() }}
          </span>
        </div>

        <!-- Next Button -->
        <button
          type="button"
          (click)="goToNext()"
          [disabled]="currentPage() === totalPages()"
          [class]="nextButtonClass()"
          class="relative ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Siguiente
          <svg class="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </nav>
  `,
  styles: ``
})
export class PaginationComponent {
  // ───────────────────────────────────────────────────────────────────────────
  // 📥 INPUT PROPERTIES
  // ───────────────────────────────────────────────────────────────────────────
  currentPage = input.required<number>();
  totalItems = input.required<number>();
  itemsPerPage = input.required<number>();

  // ───────────────────────────────────────────────────────────────────────────
  // 📤 OUTPUT PROPERTIES
  // ───────────────────────────────────────────────────────────────────────────
  pageChange = output<number>();

  // ───────────────────────────────────────────────────────────────────────────
  // 🧮 COMPUTED PROPERTIES
  // ───────────────────────────────────────────────────────────────────────────
  totalPages = computed(() => Math.ceil(this.totalItems() / this.itemsPerPage()));
  
  startItem = computed(() => (this.currentPage() - 1) * this.itemsPerPage() + 1);
  
  endItem = computed(() => {
    const end = this.currentPage() * this.itemsPerPage();
    return Math.min(end, this.totalItems());
  });

  visiblePages = computed(() => {
    const current = this.currentPage();
    const total = this.totalPages();
    const pages: (number | string)[] = [];

    if (total <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (current > 4) {
        pages.push('...');
      }

      // Show pages around current
      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (current < total - 3) {
        pages.push('...');
      }

      // Always show last page
      if (total > 1) {
        pages.push(total);
      }
    }

    return pages;
  });

  previousButtonClass = computed(() => 
    this.currentPage() === 1 
      ? 'text-gray-400 bg-gray-100' 
      : 'text-gray-900 bg-white hover:bg-gray-50'
  );

  nextButtonClass = computed(() => 
    this.currentPage() === this.totalPages() 
      ? 'text-gray-400 bg-gray-100' 
      : 'text-gray-900 bg-white hover:bg-gray-50'
  );

  // ───────────────────────────────────────────────────────────────────────────
  // 🎬 EVENT HANDLERS
  // ───────────────────────────────────────────────────────────────────────────
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages() && page !== this.currentPage()) {
      this.pageChange.emit(page);
    }
  }

  goToPrevious() {
    if (this.currentPage() > 1) {
      this.pageChange.emit(this.currentPage() - 1);
    }
  }

  goToNext() {
    if (this.currentPage() < this.totalPages()) {
      this.pageChange.emit(this.currentPage() + 1);
    }
  }

  getPageButtonClass(page: number): string {
    const baseClass = 'relative inline-flex items-center px-3 py-2 text-sm font-semibold ring-1 ring-inset focus-visible:outline-offset-0';
    
    if (page === this.currentPage()) {
      return `${baseClass} bg-indigo-600 text-white ring-indigo-600`;
    }
    
    return `${baseClass} text-gray-900 ring-gray-300 hover:bg-gray-50`;
  }
}
