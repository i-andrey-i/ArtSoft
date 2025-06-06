import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { UserService } from '@app/services/user.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-redirect-to-default',
    standalone: true,
    imports: [RouterModule],
    template: '<div>Redirecting...</div>'
})
export class RedirectToDefaultComponent implements OnInit {
    constructor(private _router: Router, private _authService: AuthService, private _userService: UserService) {}

    ngOnInit(): void {
        this._userService.getMe().subscribe({
            next: () => this._router.navigate(['/main']),
            error: () => this._router.navigate(['/login'])
        })
    }
}