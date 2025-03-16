import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component' // Импортируйте ваш компонент
import { RegistrationComponent } from './registration/registration.component' // Импортируйте ваш компонент

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'registration', component: RegistrationComponent },
]
