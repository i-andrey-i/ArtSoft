import { Component } from '@angular/core'
import { CustomInputComponent } from '../../custom/custom-input/custom-input.component'
import { CustomButtonComponent } from '../../custom/custom-button/custom-button.component'

@Component({
	selector: 'app-registration',
	standalone: true,
	templateUrl: './registration.component.html',
	styles: [],
	imports: [CustomInputComponent, CustomButtonComponent],
})
export class RegistrationComponent {
	email: string = ''
	password: string = ''
	name: string = ''

	// Метод для обработки клика по кнопке
	onLoginClick(): void {
		console.log('Login button clicked')
		console.log('Email:', this.email)
		console.log('Password:', this.password)
		console.log('Name:', this.name )
	}
}
