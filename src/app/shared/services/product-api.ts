import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../../app.config";
import { Product } from "../../pages/products/types";

@Injectable({
    providedIn: 'root'
})

export class ProductApiService {
    private readonly baseUrl = inject(API_URL);
    private readonly http = inject(HttpClient);
    getProducts() {
        const url = `${this.baseUrl}/products`;
        return this.http.get<Product[]>(url);
    }
}