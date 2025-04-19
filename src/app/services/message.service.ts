import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { Message } from '../models/message.model'

@Injectable({ providedIn: 'root' })
export class MessageService {
	private messages: Message[] = [
		{
			id: 1,
			senderId: 1,
			receiverId: 2,
			content: 'Hey, how are you?',
			timestamp: new Date('2024-02-20T10:30:00'),
		},
		{
			id: 2,
			senderId: 2,
			receiverId: 1,
			content: "I'm good, thanks! How about you?",
			timestamp: new Date('2024-02-20T10:32:00'),
		},
		{
			id: 3,
			senderId: 1,
			receiverId: 2,
			content: 'Doing well! Want to meet up later?',
			timestamp: new Date('2024-02-20T10:33:00'),
		},
	]

	getMessages(userId: number): Observable<Message[]> {
		return of(
			this.messages.filter(
				msg => msg.senderId === userId || msg.receiverId === userId
			)
		)
	}

	sendMessage(message: Message): Observable<Message> {
		message.id = this.messages.length + 1
		this.messages.push(message)
		return of(message)
	}
}
