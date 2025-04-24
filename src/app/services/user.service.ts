import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { User } from '../models/user.model'
import { HttpClient } from '@angular/common/http'
import { BaseHttpService } from './base/base-http.service'
import { QueryOptions } from './models/options'

@Injectable({
	providedIn: 'root',
})
export class UserService extends BaseHttpService {
	getUsers(options: QueryOptions = {}): Observable<User[]> {
		return this.get<User[]>('users', options)
	}

	getMe(): Observable<User[]> {
		return this.get<User[]>('users/me')
	}

	getUserById(userId: number): Observable<User | undefined> {
		return this.get<User>(`users/${userId}`)
	}

	constructor() {
		super()
	}
}
