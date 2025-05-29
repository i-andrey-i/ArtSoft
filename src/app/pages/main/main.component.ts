import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { ModalComponent } from '@app/components/modal/modal.component'
import { Chat } from '../../models/chat.model'
import { MessageService } from '../../services/message.service'
import { UserService } from '../../services/user.service'

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-main',
	standalone: true,
	imports: [CommonModule, FormsModule, ModalComponent],
	providers: [UserService, MessageService],
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss'],
})

export class MainComponent implements OnInit {
	sidebarWidth: number = 200; // Начальная ширина sidebar
	isResizing: boolean = false;

	chats: Chat[] = []
	filteredChats: Chat[] = []
	selectedChat: Chat | null = null
	searchQuery: string = ''

	constructor(
		private _userService: UserService,
		private _messageService: MessageService,
		private _router: Router,
		private _cdr: ChangeDetectorRef
	) {
		this._userService.getMe().subscribe({
			next: () => {
				this.loadUsers()
			},
			error: () => {
				this._router.navigate(['/login'])
			}
		})
	}

	@HostListener('document:mousemove', ['$event'])
	onResizing(event: MouseEvent): void {
		if (this.isResizing) {
			const newWidth = event.clientX;
			if (newWidth > 100 && newWidth < 600) {
				this.sidebarWidth = newWidth;
			}
		}
	}

	@HostListener('document:mouseup')
	onResizeEnd(): void {
		this.isResizing = false;
	}

	ngOnInit(): void {
		this.loadUsers()
	}

	loadUsers(): void {
		this._messageService.getChats().subscribe(chats => {
			this.chats = chats;
			this.filteredChats = chats;
			this._cdr.markForCheck();
		})
 
		this.filteredChats = this.chats;
	}

	onSearch(): void {
		this._messageService.getChats({
			search: this.searchQuery
		})
		.subscribe(chats => {
			this.filteredChats = chats
		})
	}

	selectChat(chat: Chat): void {
		this._router.navigate(['/chat', chat.id]);
	}

	onResizeStart(event: MouseEvent): void {
		this.isResizing = true;
		event.preventDefault();
	}

	focusSearch(): void {
		const searchInput = document.getElementById('search-input');
		if (searchInput) {
			searchInput.focus();
		}
	}
}