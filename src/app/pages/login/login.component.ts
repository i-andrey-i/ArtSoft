import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '@app/services/auth.service'
import { CustomButtonComponent } from '../../custom/custom-button/custom-button.component'
import { CustomInputComponent } from '../../custom/custom-input/custom-input.component'

@Component({
	selector: 'app-login',
	standalone: true,
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	imports: [CustomInputComponent, CustomButtonComponent, CommonModule, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
	protected readonly loginForm = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [Validators.required, Validators.minLength(8)]),
	  });

	constructor(private _router: Router, private _authService: AuthService) {}

	onLoginClick(): void {
		console.log(this.loginForm.value)
		if (this.isLoginFormInvalid()) {
			return;
		}

		this._authService.login({
			username: this.loginForm.controls['email'].value as string,
			password: this.loginForm.controls['password'].value as string
		})
	}

	onRegisterClick(): void {
		this._router.navigate(['/register'])
	}

	onRestoreClick(): void {
		this._router.navigate(['/restore'])
	}

	private isLoginFormInvalid(): boolean {
		return this.loginForm.invalid ||
			!this.loginForm.controls['email'].value ||
			!this.loginForm.controls['password'].value
	}
}
