import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface RegistrationFormData {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
}

export class RegistrationFormModel {
    private readonly form: FormGroup;

    constructor(private readonly fb: FormBuilder) {
        this.form = this.fb.group(
            {
                email: ['', [Validators.required, Validators.email]],
                password: ['', [Validators.required, Validators.minLength(6)]],
                confirmPassword: ['', [Validators.required]],
                name: ['', [Validators.required, Validators.minLength(2)]],
            },
            {
                validators: this.passwordMatchValidator,
            }
        );
    }

    private passwordMatchValidator(form: FormGroup): void {
        const password = form.get('password');
        const confirmPassword = form.get('confirmPassword');

        if (password?.value !== confirmPassword?.value) {
            confirmPassword?.setErrors({ passwordMismatch: true });
        } else {
            confirmPassword?.setErrors(null);
        }
    }

    public getForm(): FormGroup {
        return this.form;
    }

    public getFormData(): RegistrationFormData | null {
        if (this.form.valid) {
            return this.form.value;
        }

        return null;
    }

    public getErrorMessage(controlName: string): string {
        const control = this.form.get(controlName);
        if (!control) return '';

        if (control.hasError('required')) {
            return 'This field is required';
        }
        if (control.hasError('email')) {
            return 'Please enter a valid email';
        }
        if (control.hasError('minlength')) {
            const requiredLength = control.errors?.['minlength'].requiredLength;

            return `Minimum length is ${requiredLength} characters`;
        }
        if (control.hasError('passwordMismatch')) {
            return 'Passwords do not match';
        }

        return '';
    }

    public resetForm(): void {
        this.form.reset();
    }
}
