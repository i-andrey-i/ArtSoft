import { Routes } from '@angular/router'
import { HomeComponent } from './pages/home/home.component' // Импортируйте ваш компонент
import { RegistrationComponent } from './pages/registration/registration.component' // Импортируйте ваш компонент
import { LoginComponent } from './pages/login/login.component'

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'registration', component: RegistrationComponent },
	{path:'login', component: LoginComponent}
]
