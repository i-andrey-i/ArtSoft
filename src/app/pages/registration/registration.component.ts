import { Component } from '@angular/core'
import { CustomInputComponent } from '../../custom/custom-input/custom-input.component'
import { CustomButtonComponent } from '../../custom/custom-button/custom-button.component'
import { Router } from '@angular/router'

@Component({
	selector: 'app-registration',
	standalone: true,
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.scss'],
	imports: [CustomInputComponent, CustomButtonComponent],
})
export class RegistrationComponent {
	email: string = ''
	password: string = ''
	confirmPassword: string = ''
	name: string = ''
	errorMessage: string = ''

	constructor(private router: Router) {}

	onRegisterClick(): void {
		this.errorMessage = ''

		/*if (!this.name || !this.email || !this.password || !this.confirmPassword) {
			this.errorMessage = 'All fields are required'
			return
		}

		if (this.password !== this.confirmPassword) {
			this.errorMessage = 'Passwords do not match'
			return
		}

		if (this.password.length < 6) {
			this.errorMessage = 'Password must be at least 6 characters long'
			return
		}*/

		this.router.navigate(['/main'])
	}
}
