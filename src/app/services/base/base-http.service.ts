import { HttpClient, HttpParams, HttpParamsOptions } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class BaseHttpService {
    private http = inject(HttpClient);
    private baseUrl = environment.ApiUrl;

    protected get<T>(url: string, params: Record<string, any> = {}) {
        return this.http.get<T>(`${this.baseUrl}/${url}`, {
            observe: 'body',
            params: params
        });
    }

    protected post<T>(url: string, body: Record<string, any> = {}, xWWWFormUrlencoded = false) {
        return this.http.post<T>(`${this.baseUrl}/${url}`, {
            body: xWWWFormUrlencoded ? new URLSearchParams(body) : body
        });
    }

    protected patch<T>(url: string, body: Record<string, string> = {}) {
        return this.http.patch<T>(`${this.baseUrl}/${url}`, {
            observe: 'body',
            body: body
        });
    }
}