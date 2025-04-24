import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Message } from '../models/message.model'
import { BaseHttpService } from './base/base-http.service'
import { Chat } from '../models/chat.model';
import { PaginationOptions, QueryOptions } from './models/options';

@Injectable({ providedIn: 'root' })
export class MessageService extends BaseHttpService {
	getChats(options: QueryOptions = {}): Observable<Chat[]> {
		return this.get<Chat[]>('messages', options);
	}

	getMessages(
		chatId: string, 
		options: PaginationOptions = {}
	): Observable<Message[]> {
		return this.get<Message[]>(`messages/${chatId}`, options);
	}

	sendMessage(message: Message): Observable<Message> {
		return this.post<Message>('messages', message);
	}

	read(message_id: string) {
		return this.patch(`messages/${message_id}/read`);
	}

	constructor() {
		super()
	}
}
