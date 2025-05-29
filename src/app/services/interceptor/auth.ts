import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { tokenStore } from '../models/token-store';

export const authInterceptor: HttpInterceptorFn = (
    req: HttpRequest<unknown>, 
    next: HttpHandlerFn
) => {
    const token = tokenStore.get()?.accessToken;

    if (token != undefined) {
        req = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
    }

    return next(req);
};