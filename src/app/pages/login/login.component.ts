import { Component } from '@angular/core'
import { CustomInputComponent } from '../../custom/custom-input/custom-input.component'
import { CustomButtonComponent } from '../../custom/custom-button/custom-button.component'
import { Router } from '@angular/router'
import { CommonModule } from '@angular/common'

@Component({
	selector: 'app-login',
	standalone: true,
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	imports: [CustomInputComponent, CustomButtonComponent, CommonModule],
})
export class LoginComponent {
	constructor(private router: Router) {}

	onLoginClick(): void {
		this.router.navigate(['/main'])
	}

	onRegisterClick(): void {
		this.router.navigate(['/register'])
	}

	onRestoreClick(): void {
		this.router.navigate(['/restore'])
	}
}
