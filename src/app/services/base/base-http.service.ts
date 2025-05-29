import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Params } from '../types/params';

@Injectable({ providedIn: 'root' })
export class BaseHttpService {
    private _baseUrl = environment.ApiUrl;
    private _http: HttpClient;

    constructor() {
        this._http = inject(HttpClient);
    }

    protected get<T>(url: string, params?: Params): Observable<T> {
        return this._http.get<T>(`${this._baseUrl}/${url}`, {
            params: params
        });
    }

    protected post<T>(url: string, body?: File | Params | FormData | HttpParams, xWWWFormUrlencoded = false): Observable<T> {
        return this._http.post<T>(`${this._baseUrl}/${url}`, body, {
            headers: new HttpHeaders({
                'Content-Type': xWWWFormUrlencoded ? 'application/x-www-form-urlencoded' : 'application/json'
            })
        });
    }

    protected patch<T>(url: string, body?: Params): Observable<T> {
        return this._http.patch<T>(`${this._baseUrl}/${url}`, body);
    }
}