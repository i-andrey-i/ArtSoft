import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './pages/login/login.component'
import { RegistrationComponent } from './pages/registration/registration.component'
import { RestorePasswordComponent } from './pages/restorePassword/restorePassword.component'
import { ChangePasswordComponent } from './pages/changePassword/changePassword.component'
import { MainComponent } from './pages/main/main.component'
import { ChatPageComponent } from './pages/chat/chat.page.component'
import { HttpClientModule } from '@angular/common/http';

export const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegistrationComponent },
	{ path: 'restore', component: RestorePasswordComponent },
	{ path: 'change', component: ChangePasswordComponent },
	{ path: 'main', component: MainComponent },
	{ path: 'chat/:id', component: ChatPageComponent },
	{ path: '', redirectTo: '/login', pathMatch: 'full' },
	{ path: '**', redirectTo: '/login' },
]

@NgModule({
	imports: [RouterModule.forRoot(routes), HttpClientModule],
	exports: [RouterModule],
})
export class AppRoutingModule {}
