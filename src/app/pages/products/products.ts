import { Component, inject, signal } from "@angular/core";
import { Store } from "@ngrx/store";
import { productsActions } from "./store/product-actions";
import { ProductCard } from "../../core/components/product-card";
import { FormsModule } from "@angular/forms";
import { toSignal } from "@angular/core/rxjs-interop";
import { productsFeature } from "./store/product-features";
import { Product } from "./types";
import { cartActions } from "../cart/store/cart-actions";

@Component({
    selector: 'app-products',
    imports: [ProductCard, FormsModule],
    template: `
    <div class="py-8">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold text-slate-900 mb-8 ml-10">Products</h1>
        <div class="search mr-10">
          <input
            [(ngModel)]="searchQuery"
            (ngModelChange)="onSearch($event)"
            class="w-72 p-2  rounded-lg border-2 border-slate-400  focus:outline-none focus:ring-2 focus:ring-slate-400"
            type="text"
            placeholder="Search products..."
          />
        </div>
      </div>

      @if(loading()) {
      <div class="flex items-center justify-center">
        <p>Loading product...</p>
      </div>
      } @if(products()?.length === 0 && !loading()) {
      <div class="flex items-center justify-center">
        <p>No products available.</p>
      </div>
      } @else {
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        @for (product of products(); track product.id) {
        <app-product-card (addToCart)="onAddToCart($event)" [product]="product" />
        }
      </div>
      }
    </div>
  `,
})

export class ProductsPage {
    private readonly store = inject(Store);
    protected readonly products = toSignal(this.store.select(productsFeature.selectFilteredProducts));
    protected readonly loading = toSignal(this.store.select(productsFeature.selectLoading));

    protected searchQuery = signal('');

    protected onSearch(query: string): void {
        this.store.dispatch(productsActions.search({ searchQuery: query }));
    }


    ngOnInit() {
        this.store.dispatch(productsActions.loadProducts());
    }

    protected onAddToCart(product: Product): void {
     this.store.dispatch(cartActions.addToCart({ product }));
  }

}