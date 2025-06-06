import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { bootstrapApplication } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { authInterceptor } from "./app/services/interceptor/auth";
// eslint-disable-next-line @typescript-eslint/naming-convention
import Aura from "@primeng/themes/aura";
import { providePrimeNG } from "primeng/config";
import { AppComponent } from "./app/app.component";
import { routes } from "./app/app.routes";
import { ErrorHandlerService } from "./app/services/error-handler.service";

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(routes),
        provideHttpClient(withInterceptors([authInterceptor])),
        provideAnimations(),
        providePrimeNG({
            theme: {
                preset: Aura,
            },
        }),
    ],
}).catch((err) => {
    const errorHandler = new ErrorHandlerService();
    errorHandler.handleBootstrapError(err);
});
