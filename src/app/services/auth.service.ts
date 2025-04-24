import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { BaseHttpService } from './base/base-http.service'
import * as DTO from './dto/auth.dto'
import { Token } from './models/token'
import { tokenStore } from './models/token-store'


@Injectable({ providedIn: 'root' })
export class AuthService extends BaseHttpService {
	private isAuth = false

	login(dto: DTO.LoginDTO) {
		this.post<Token>('auth/login', dto)
			.subscribe({
				next: (t) => {
					tokenStore.set(t);
					this.isAuth = true
					this.router.navigate(['/main'])
				}, 
				error: console.log
			})
	}

	register(dto: DTO.RegisterDTO) {
		this.post('auth/register', dto)
			.subscribe({
				next: () => {
					this.isAuth = true
					this.router.navigate(['/login'])
				},
				error: console.log
			})
	}

	logout() {
		tokenStore.remove()
		this.isAuth = false
		this.router.navigate(['/login'])
	}

	restorePassword(dto: DTO.RestorePasswordDTO) {
		this.post('auth/restore-password', dto)
			.subscribe({
				next: () => {
					this.router.navigate(['/login'])
				},
				error: console.log
		})
	}

	changePassword(dto: DTO.ChangePasswordDTO) {
		this.post('auth/change-password', dto)
			.subscribe({
				next: () => {
					this.router.navigate(['/login'])
				},
				error: console.log
			})
	}


	isAuthenticated(): boolean {
		return this.isAuth
	}

	constructor(private router: Router) {
		super()
	}
}
