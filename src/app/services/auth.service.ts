import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BaseHttpService } from "./base/base-http.service";
import * as DTO from "./dto/auth.dto";
import { Token } from "./models/token";
import { tokenStore } from "./models/token-store";
import { ErrorHandlerService } from "./error-handler.service";

@Injectable({ providedIn: "root" })
export class AuthService extends BaseHttpService {
    private isAuth = false;

    constructor(
        private router: Router,
        private _errorHandler: ErrorHandlerService
    ) {
        super();
    }

    login(dto: DTO.LoginDTO) {
        this.post<Token>("auth/login", dto).subscribe({
            next: (t) => {
                tokenStore.set(t);
                this.isAuth = true;
                this.router.navigate(["/main"]);
            },
            error: (error) => this._errorHandler.handleError(error),
        });
    }

    register(dto: DTO.RegisterDTO) {
        this.post("auth/register", dto).subscribe({
            next: () => {
                this.isAuth = true;
                this.router.navigate(["/login"]);
            },
            error: (error) => this._errorHandler.handleError(error),
        });
    }

    logout() {
        tokenStore.remove();
        this.isAuth = false;
        this.router.navigate(["/login"]);
    }

    restorePassword(dto: DTO.RestorePasswordDTO) {
        this.post("auth/restore-password", dto).subscribe({
            next: () => {
                this.router.navigate(["/login"]);
            },
            error: (error) => this._errorHandler.handleError(error),
        });
    }

    changePassword(dto: DTO.ChangePasswordDTO) {
        this.post("auth/change-password", dto).subscribe({
            next: () => {
                this.router.navigate(["/login"]);
            },
            error: (error) => this._errorHandler.handleError(error),
        });
    }

    isAuthenticated(): boolean {
        return this.isAuth;
    }
}
