import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { User } from '../models/user.model'
import { BaseHttpService } from './base/base-http.service'
import { QueryOptions } from './models/options'

@Injectable({
	providedIn: 'root',
})
export class UserService extends BaseHttpService {
	constructor() {
		super()
	}
	
	getUsers(options: QueryOptions = {}): Observable<User[]> {
		return this.get<User[]>('users', options)
	}

	getMe(): Observable<User[]> {
		return this.get<User[]>('users/me')
	}

	getUserById(userId: number): Observable<User | undefined> {
		return this.get<User>(`users/${userId}`)
	}
}
