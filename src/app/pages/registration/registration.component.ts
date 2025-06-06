import { Component, OnInit } from "@angular/core";
import { CustomInputComponent } from "../../custom/custom-input/custom-input.component";
import { CustomButtonComponent } from "../../custom/custom-button/custom-button.component";
import { Router } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import {
    RegistrationFormModel,
    RegistrationFormData,
} from "../../models/registration-form.model";
import { FormBuilder } from "@angular/forms";

@Component({
    selector: "app-registration",
    standalone: true,
    templateUrl: "./registration.component.html",
    styleUrls: ["./registration.component.scss"],
    imports: [CustomInputComponent, CustomButtonComponent, ReactiveFormsModule],
})
export class RegistrationComponent implements OnInit {
    public readonly formModel: RegistrationFormModel;
    public errorMessage = "";

    constructor(
        private readonly router: Router,
        private readonly fb: FormBuilder
    ) {
        this.formModel = new RegistrationFormModel(fb);
    }

    public ngOnInit(): void {}

    public onRegisterClick(): void {
        const formData = this.formModel.getFormData();
        if (formData) {
            console.log("Registration data:", formData);
            void this.router.navigate(["/main"]);
        } else {
            this.errorMessage = "Please fill in all fields correctly";
        }
    }

    public getErrorMessage(controlName: string): string {
        return this.formModel.getErrorMessage(controlName);
    }
}
