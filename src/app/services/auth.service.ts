import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

@Injectable({ providedIn: 'root' })
export class AuthService {
	private isAuth = false

	login() {
		this.isAuth = true
		this.router.navigate(['/main'])
	}

	register() {
		this.isAuth = true
		this.router.navigate(['/main'])
	}

	logout() {
		this.isAuth = false
		this.router.navigate(['/login'])
	}

	isAuthenticated(): boolean {
		return this.isAuth
	}

	constructor(private router: Router) {}
}
