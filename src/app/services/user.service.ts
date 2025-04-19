import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { User } from '../models/user.model'

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private users: User[] = [
		{
			id: 1,
			name: 'John Doe',
			avatar: 'https://i.pravatar.cc/150?img=1',
			lastMessage: 'Hey, how are you?',
			lastMessageTime: new Date('2024-02-20T10:30:00'),
		},
		{
			id: 2,
			name: 'Jane Smith',
			avatar: 'https://i.pravatar.cc/150?img=2',
			lastMessage: 'Can we meet tomorrow?',
			lastMessageTime: new Date('2024-02-20T09:15:00'),
		},
		{
			id: 3,
			name: 'Mike Johnson',
			avatar: 'https://i.pravatar.cc/150?img=3',
			lastMessage: 'The project is due next week',
			lastMessageTime: new Date('2024-02-19T16:45:00'),
		},
	]

	getUsers(): Observable<User[]> {
		return of(this.users)
	}

	getUserById(id: number): Observable<User | undefined> {
		return of(this.users.find(user => user.id === id))
	}
}
