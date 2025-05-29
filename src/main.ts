import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { bootstrapApplication } from '@angular/platform-browser'
import { provideRouter } from '@angular/router'
import { authInterceptor } from '@app/services/interceptor/auth'
import { AppComponent } from './app/app.component'
import { routes } from './app/app.routes'

bootstrapApplication(AppComponent, {
	providers: [
		provideRouter(routes), 
		provideHttpClient(withInterceptors([authInterceptor]))
	],
}).catch(err => console.error(err))
