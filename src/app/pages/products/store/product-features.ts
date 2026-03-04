import { createFeature, createReducer, on } from "@ngrx/store";
import { Product } from "../types";
import { productsActions } from "./product-actions";

export type ProductState = {
    products: Product[];
    filteredProducts: Product[]; // filtered records based on search
    searchQuery: string | null;
    loading: boolean;
    error: string | null;
}

export const initialProductState: ProductState = {
    products: [],
    filteredProducts: [],
    searchQuery: null,
    loading: false,
    error: null
}

export const productsFeature = createFeature({
    name: 'products',
    reducer: createReducer(
        initialProductState,
        on(productsActions.loadProducts, (state) => {
            return {
                ...state,
                loading: true,
                error: null
            }
        }),
        on(productsActions.loadProductsSuccess, (state, { products }) => {
            return {
                ...state,
                products,
                filteredProducts: products,
                loading: false,
                error: null
            }
        }),
        on(productsActions.loadProductsFailure, (state, { error }) => {
            return {
                ...state,
                loading: false,
                error
            }
        }),
        on(productsActions.search, (state, { searchQuery }) => {
            const filteredProducts = state.products.filter((product) =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            return {
                ...state,
                searchQuery,
                filteredProducts,
            };
        })
    )
})