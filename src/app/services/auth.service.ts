import { HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { BaseHttpService } from './base/base-http.service'
import { ChangePasswordDTO, LoginDTO, RegisterDTO, RestorePasswordDTO } from './dto/auth.dto'
import { Token } from './models/token'
import { tokenStore } from './models/token-store'


@Injectable({ providedIn: 'root' })
export class AuthService extends BaseHttpService {
	private _isAuth = false
	

	constructor(private _router: Router) {
		super()
	}

	login(dto: LoginDTO): void {
		const httpParams = new HttpParams()
			.set('username', dto.username)
			.set('password', dto.password)

		this.post<Token>('auth/login', httpParams, true)
			.subscribe({
				next: (t) => {
					tokenStore.set(t);
					this._isAuth = true
					this._router.navigate(['/main'])
				}, 
				error: console.log
			})
	}

	register(dto: RegisterDTO): void {
		this.post('auth/register', dto)
			.subscribe({
				next: () => {
					this._isAuth = false
					this._router.navigate(['/login'])
				},
				error: console.log
			})
	}

	logout(): void {
		tokenStore.remove()
		this._isAuth = false
		this._router.navigate(['/login'])
	}

	restorePassword(dto: RestorePasswordDTO): void {
		this.post('auth/restore-password', dto)
			.subscribe({
				next: () => {
					this._router.navigate(['/login'])
				},
				error: console.log
		})
	}

	changePassword(dto: ChangePasswordDTO): void {
		this.post('auth/change-password', dto)
			.subscribe({
				next: () => {
					this._router.navigate(['/login'])
				},
				error: console.log
			})
	}


	isAuthenticated(): boolean {
		return this._isAuth
	}
}
