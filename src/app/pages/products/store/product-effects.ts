import { inject } from "@angular/core"
import { Actions, createEffect,ofType } from "@ngrx/effects"
import { ProductApiService } from "../../../shared/services/product-api"
import { catchError, of, switchMap,map } from "rxjs"
import { productsActions } from "./product-actions"

export const productsEffect = createEffect(
  (actions$ = inject(Actions), productApi = inject(ProductApiService)) => {
    return actions$.pipe
        (ofType(productsActions.loadProducts),
        switchMap(() => {
            return productApi.getProducts().pipe(
                map(products => productsActions.loadProductsSuccess({products})),
                catchError((error) => of(productsActions.loadProductsFailure({ error: error.message })))
            )
        })
    )
  },
  { functional: true }
)