import { Routes } from '@angular/router'
import { RegistrationComponent } from './pages/registration/registration.component' 
import { LoginComponent } from './pages/login/login.component'
import { RestorePasswordComponent } from './pages/restorePassword/restorePassword.component'
import { ChangePasswordComponent } from './pages/changePassword/changePassword.component'


export const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegistrationComponent }, 
	{ path: '', redirectTo: '/login', pathMatch: 'full' }, 
	{ path: 'restore', component: RestorePasswordComponent},
	{ path: 'change', component: ChangePasswordComponent},
	 
]
