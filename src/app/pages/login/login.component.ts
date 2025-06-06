import { Component } from "@angular/core";
import { CustomInputComponent } from "../../custom/custom-input/custom-input.component";
import { CustomButtonComponent } from "../../custom/custom-button/custom-button.component";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-login",
    standalone: true,
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
    imports: [CustomInputComponent, CustomButtonComponent, CommonModule],
})
export class LoginComponent {
    constructor(private readonly router: Router) {}

    public onLoginClick(): void {
        void this.router.navigate(["/main"]);
    }

    public onRegisterClick(): void {
        void this.router.navigate(["/auth/register"]);
    }

    public onRestoreClick(): void {
        void this.router.navigate(["/auth/restore"]);
    }
}
