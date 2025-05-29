import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '@app/services/auth.service'
import { confirmPasswordValidator } from '@app/validators/confirm-password-validator'
import { CustomButtonComponent } from '../../custom/custom-button/custom-button.component'
import { CustomInputComponent } from '../../custom/custom-input/custom-input.component'

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-registration',
	standalone: true,
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.scss'],
	imports: [CustomInputComponent, CustomButtonComponent, ReactiveFormsModule, CommonModule],
})
export class RegistrationComponent {
	protected readonly registrationForm = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [Validators.required, Validators.minLength(8)]),
		confirmPassword: new FormControl('', [Validators.required]),
		name: new FormControl('', [Validators.required]),
	}, {
		validators: [confirmPasswordValidator]
	})
	constructor(private _authService: AuthService) {}

	onRegisterClick(): void {
		if (this.registrationForm.invalid) {
			return
		}

		this._authService.register({
			name: this.registrationForm.value.name as string,
			username: this.registrationForm.value.email as string,
			password: this.registrationForm.value.password as string,
			confirmPassword: this.registrationForm.value.confirmPassword as string,
		})
	}
}
