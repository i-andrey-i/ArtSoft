import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Message } from '../models/message.model'
import { BaseHttpService } from './base/base-http.service'
import { Chat } from '../models/chat.model';
import { MessageSendDTO } from './dto/message.dto';
import { PaginationOptions, QueryOptions } from './models/options';

@Injectable({ providedIn: 'root' })
export class MessageService extends BaseHttpService {
	constructor() {
		super()
	}

	getChats(options: QueryOptions = {}): Observable<Chat[]> {
		return this.get<Chat[]>('messages', options);
	}

	getMessages(
		chatId: string, 
		options: PaginationOptions = {}
	): Observable<Message[]> {
		return this.get<Message[]>(`messages/${chatId}`, options);
	}

	sendMessage(message: MessageSendDTO): Observable<Message> {
		return this.post<Message>('messages', message);
	}

	read(messageId: string): Observable<unknown> {
		return this.patch<unknown>(`messages/${messageId}/read`);
	}

}
