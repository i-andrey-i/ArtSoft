import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Message } from '../../models/message.model';
import { User } from '../../models/user.model';
import { MessageService } from '../../services/message.service';
import { FileUploadComponent } from '../file-upload/file-upload.component';

@Component({
    selector: 'app-chat',
    standalone: true,
    imports: [FormsModule, CommonModule, FileUploadComponent],
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnChanges {
    @Input() selectedChat: User | null = null;
    @Output() messageSent = new EventEmitter<Message>();
    messages: Message[] = [];
    newMessage = '';

    constructor(private messageService: MessageService) {}

    ngOnInit(): void {
        if (this.selectedChat) {
            this.loadMessages();
        }
    }

    ngOnChanges(): void {
        if (this.selectedChat) {
            this.loadMessages();
        }
    }

    loadMessages(): void {
        if (this.selectedChat) {
            this.messageService
                .getMessages(this.selectedChat.id)
                .subscribe((messages) => {
                    this.messages = messages;
                });
        }
    }

    onSendMessage() {
        if (this.newMessage.trim() && this.selectedChat) {
            const message: Omit<Message, 'id'> = {
                text: this.newMessage,
                created_at: new Date().toISOString(),
                from_user_id: 'current_user_id',
                is_read: false,
            };
            this.messages = [...this.messages, message as Message];
            this.messageSent.emit(message as Message);
            this.newMessage = '';
        }
    }

    onFileUploaded(file: File) {
        if (this.selectedChat) {
            const message: Omit<Message, 'id'> = {
                text: `File uploaded: ${file.name}`,
                created_at: new Date().toISOString(),
                from_user_id: 'current_user_id', 
                is_read: false,
            };
            this.messages = [...this.messages, message as Message];
            this.messageSent.emit(message as Message);
        }
    }
}
