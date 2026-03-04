import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Product } from "../types";

export const productsActions= createActionGroup({
    source: 'Products',
    events: {
        loadProducts: emptyProps(),
        loadProductsSuccess: props<{products: Product[]}>(),
        loadProductsFailure: props<{error:string|null}>(),
        search: props<{ searchQuery: string }>(),
    }
})