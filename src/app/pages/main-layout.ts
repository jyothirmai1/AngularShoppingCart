import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "../core/components/header";
import { FooterComponent } from "../core/components/footer";
import { cartActions } from "./cart/store/cart-actions";
import { Store } from "@ngrx/store";

@Component({
    selector: 'main-layout',
    imports: [RouterOutlet, HeaderComponent, FooterComponent],
    template: `
    <app-header></app-header>
    <div class="flex-1 container mx-auto">
          <router-outlet></router-outlet>
    </div>
  
    <app-footer></app-footer>`,
    host: {
        class: 'min-h-screen flex flex-col'
    }
})

export class MainLayout {
 private readonly store = inject(Store);
  ngOnInit(): void {
    // Load cart items if needed
    this.store.dispatch(cartActions.load());
  }
}