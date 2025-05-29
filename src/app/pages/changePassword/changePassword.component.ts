import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { CustomButtonComponent } from '../../custom/custom-button/custom-button.component'
import { CustomInputComponent } from '../../custom/custom-input/custom-input.component'

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,selector: 'app-change-password',
    standalone: true,
    templateUrl: './changePassword.component.html',
    styleUrls: ['./changePassword.component.scss'],
    imports: [CustomInputComponent, CustomButtonComponent, ReactiveFormsModule],
})
export class ChangePasswordComponent {
    protected readonly changePasswordForm = new FormGroup({
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        repeatPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    })

    constructor(private _router: Router) {}

    // Метод для обработки клика по кнопке
    onLoginClick(): void {
        console.log('Login button clicked')
        console.log('Password:', this.changePasswordForm.value)
    }

    onRegisterClick(): void{
        this._router.navigate(['/login'])
    }
}
