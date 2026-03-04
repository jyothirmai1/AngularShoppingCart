import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../app.config';

export type LoginRequest = {
    username: string;
    password: string;
}
export type RegisterRequest = {
    id: number;
    username: string;
    email: string;
    password: string;
}

export type LoginResponse = {
    token: string;
}


@Injectable({
    providedIn: 'root'
})

export class AuthApiService {
    private readonly baseUrl = inject(API_URL);
    private readonly http = inject(HttpClient);

    loginRequest(data: LoginRequest) {
        const url = `${this.baseUrl}/auth/login`;
        return this.http.post<LoginResponse>(url, data);
    }

    registerRequest(data: RegisterRequest) {
        const url = `${this.baseUrl}/users`;
        return this.http.post<RegisterRequest>(url, data);
    }

}