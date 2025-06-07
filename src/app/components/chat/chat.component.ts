import { animate, style, transition, trigger } from '@angular/animations'
import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { User } from '@app/models/user.model'
import { FileService } from '@app/services/file.service'
import { UpdateService } from '@app/services/update.service'
import { UserService } from '@app/services/user.service'
import { Message } from '../../models/message.model'
import { MessageService } from '../../services/message.service'
import { MessageComponent } from '../message/message.component'

@Component({
	selector: 'app-chat',
	standalone: true,
	imports: [FormsModule, CommonModule, MessageComponent],
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger('messageAnimation', [
			transition(':enter', [
				style({ opacity: 0, transform: 'translateY(20px)' }),
				animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
			])
		])
	]
})
export class ChatComponent implements OnInit, OnChanges, OnDestroy {
	@Input() chatId!: string;
	@ViewChild('messageList') messageList!: ElementRef<HTMLDivElement>;

	messages: Message[] = []
	selectedChat: User | null = null;
	newMessage: string = ''
	attachment?: File;
	attachmentUrl?: string;
	me?: User;
	ws?: WebSocket;
	
	constructor(
		private _updateService: UpdateService,
		private _fileService: FileService,
		private _userService: UserService,
		private _messageService: MessageService,
		private _router: Router,
		private _cdr: ChangeDetectorRef
	) {
		this._userService.getMe().subscribe({
			next: (user: User) => {
				this.me = user;
				this._cdr.markForCheck();
			},
			error: () => {
				this._router.navigate(['/login']);
			}
		})
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['chatId']) {
			this.loadChatInfo();
			this.loadMessages();
		}
	}

	ngOnInit(): void {
		this.loadChatInfo()
		this.loadMessages()	
		this.prepareWebSocket()
	}

	ngOnDestroy(): void {
		this.ws?.close()
	}

	backToMain(): void {
		this._router.navigate(['/main']);
		this.ws?.close()
	}

	prepareWebSocket(): void {
		this.ws = this._updateService.update((message: Message) => {
			if (message.fromUserId == this.selectedChat?.id) {
				this.messages.push(message);
				this._cdr.markForCheck();
				this.scrollToBottom();
			}
		})
	}

	loadChatInfo(): void {
		this._userService.getUserById(this.chatId).subscribe({
			next: (user) => {
				if (user) {
					this.selectedChat = user;
				}
				this._cdr.markForCheck();
			}
		})
	}

	loadMessages(): void {
		this._messageService
			.getMessages(this.chatId, {
				limit: 100,
				offset: 0
			})
			.subscribe({
				next: (messages) => {
					this.messages = messages.map((e) => {
						if (e.fromUserId == this.me?.id) {
							e.active = true;
							e.isRead = true;
						}

						return e;
					});
					this._cdr.markForCheck();
				}
			}).add(() => this.scrollToBottom());
	}

	sendMessageWithAttachment(): void {
		if (this.newMessage.trim() === '' || !this.attachment) {
			return;
		}

		this._fileService.upload(this.attachment).subscribe({
			next: (e) => {
				this.attachmentUrl = e;
			},
		}).add(() => this.sendMessage())
	} 

	onSendMessage(): void {
		if (this.newMessage.trim() === '') {
			return;
		}
		
		if (this.attachment) {
			this.sendMessageWithAttachment();
		} else {
			this.sendMessage();
		}
	}

	onUploadAttachment(): void {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = '*/*';
		input.onchange = (): void => {
			const file = input.files?.[0];
			this.attachment = file;
			input.remove();
			this._cdr.markForCheck();
		}
		setTimeout(() => input.click());
	}

	private sendMessage(): void {
		if (this.me == undefined || this.me.id == undefined) {
			return;
		}

		this._messageService.sendMessage({
			toUserId: this.chatId,
			text: this.newMessage,
			createdAt: new Date().toISOString(),
			attachment: this.attachmentUrl,
		}).subscribe({
			next: (e) => {
				this.messages.push({
					id: e,
					text: this.newMessage,
					createdAt: new Date().toISOString(),
					fromUserId: this.me?.id as string,
					isRead: true,
					attachment: this.attachmentUrl,
					active: true,
				});
				this.newMessage = '';
				this.attachment = undefined;
				this.attachmentUrl = undefined;
				this._cdr.markForCheck();
				this.loadMessages();
			},
		})
	}
	
	private scrollToBottom(): void {
		setTimeout(() => {
			if (this.messageList?.nativeElement) {
				this.messageList.nativeElement.scrollTo({
					top: this.messageList.nativeElement.scrollHeight,
				});
			}
		}, 200)
	}
}