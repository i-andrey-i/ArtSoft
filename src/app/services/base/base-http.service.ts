import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Params } from '../types/params';

@Injectable({ providedIn: 'root' })
export class BaseHttpService {
    private _http: HttpClient = inject(HttpClient);
    private _baseUrl = environment.ApiUrl;

    protected get<T>(url: string, params?: Params): Observable<T> {
        return this._http.get<T>(`${this._baseUrl}/${url}`, {
            observe: 'body',
            params: params
        });
    }

    protected post<T>(url: string, body?: File | Params, xWWWFormUrlencoded = false): Observable<T> {
        return this._http.post<T>(`${this._baseUrl}/${url}`, {
            body: xWWWFormUrlencoded && !(body instanceof File) ? new URLSearchParams(body) : body
        });
    }

    protected patch<T>(url: string, body?: Params): Observable<T> {
        return this._http.patch<T>(`${this._baseUrl}/${url}`, {
            observe: 'body',
            body: body
        });
    }
}