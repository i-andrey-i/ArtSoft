import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { tokenStore } from '../models/token-store';

export const authInterceptor: HttpInterceptorFn = (
    req: HttpRequest<unknown>, 
    next: HttpHandlerFn
) => {
    const userToken = tokenStore.get()?.accessToken;

    if (userToken !== undefined) {
        req = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${userToken}`),
        });
    }

    return next(req);
};