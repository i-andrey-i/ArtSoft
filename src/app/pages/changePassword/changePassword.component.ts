import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { confirmPasswordValidator } from '@app/validators/confirm-password-validator'
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
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    }, {
        validators: [confirmPasswordValidator]
    })

    constructor(private _router: Router) {}

    onChangePasswordClick(): void {
        if (this.changePasswordForm.invalid) {
            return;
        }
        
        this._router.navigate(['/login'])
    }
}
