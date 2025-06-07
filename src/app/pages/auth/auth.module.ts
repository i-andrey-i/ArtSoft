import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "../login/login.component";
import { RegistrationComponent } from "../registration/registration.component";
import { RestorePasswordComponent } from "../restorePassword/restorePassword.component";
import { ChangePasswordComponent } from "../changePassword/changePassword.component";

const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "register", component: RegistrationComponent },
    { path: "restore", component: RestorePasswordComponent },
    { path: "change", component: ChangePasswordComponent },
    { path: "", redirectTo: "login", pathMatch: "full" },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthModule {}
