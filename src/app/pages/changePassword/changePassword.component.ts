import { Component } from '@angular/core'
import { CustomInputComponent } from '../../custom/custom-input/custom-input.component'
import { CustomButtonComponent } from '../../custom/custom-button/custom-button.component'
import { Router } from '@angular/router'

@Component({
    selector: 'app-changePassword',
    standalone: true,
    templateUrl: './changePassword.component.html',
    styles: [],
    imports: [CustomInputComponent, CustomButtonComponent],
})
export class ChangePasswordComponent {
    password: string = ''

    constructor(private router:Router){}

    // Метод для обработки клика по кнопке
    onLoginClick(): void {
        console.log('Login button clicked')
        console.log('Password:', this.password)
    }

    onRegisterClick(): void{
        this.router.navigate(['/login'])
    }
}
