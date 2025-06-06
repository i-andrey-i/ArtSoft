import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '@app/services/auth.service'
import { CustomButtonComponent } from '../../custom/custom-button/custom-button.component'
import { CustomInputComponent } from '../../custom/custom-input/custom-input.component'

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-restore-password',
    standalone: true,
    templateUrl: './restorePassword.component.html',
    styleUrls: ['./restorePassword.component.scss'],
    imports: [CustomInputComponent, CustomButtonComponent, ReactiveFormsModule],
})
export class RestorePasswordComponent {
    protected readonly restorePasswordForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
    })

    constructor(private _authService: AuthService){}


    onRestoreClick(): void{
        if (this.restorePasswordForm.invalid) {
            return
        }

        this._authService.restorePassword({
            username: this.restorePasswordForm.value.email as string,
        })
    }
}
