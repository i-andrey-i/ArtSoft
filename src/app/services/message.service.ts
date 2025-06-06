import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat } from '../models/chat.model';
import { Message } from '../models/message.model';
import { BaseHttpService } from './base/base-http.service';
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

	sendMessage(message: MessageSendDTO): Observable<string> {
		return this.post<string>('messages', message);
	}

	read(messageId: string): Observable<unknown> {
		const path = `messages/${messageId}/read`;

		return this.patch<unknown>(path);
	}

}
