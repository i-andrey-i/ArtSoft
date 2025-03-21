import { Component } from '@angular/core'
import { CustomInputComponent } from '../../custom/custom-input/custom-input.component'
import { CustomButtonComponent } from '../../custom/custom-button/custom-button.component'
import { Router } from '@angular/router'

@Component({
    selector: 'app-restorePassword',
    standalone: true,
    templateUrl: './restorePassword.component.html',
    styles: [],
    imports: [CustomInputComponent, CustomButtonComponent],
})
export class RestorePasswordComponent {
    email: string = ''

    constructor(private router:Router){}

    // Метод для обработки клика по кнопке
    onLoginClick(): void {
        console.log('Login button clicked')
        console.log('Email:', this.email)
    }

    onRegisterClick(): void{
        this.router.navigate(['/change'])
    }
}
