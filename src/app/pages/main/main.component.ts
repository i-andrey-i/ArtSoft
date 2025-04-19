import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ChatComponent } from '../../components/chat/chat.component'
import { MessageService } from '../../services/message.service'
import { UserService } from '../../services/user.service'
import { User } from '../../models/user.model'
import { Message } from '../../models/message.model'

@Component({
	selector: 'app-main',
	standalone: true,
	imports: [CommonModule, FormsModule, ChatComponent],
	providers: [UserService, MessageService],
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
	users: User[] = []
	filteredUsers: User[] = []
	selectedUser: User | null = null
	searchQuery: string = ''

	constructor(
		private userService: UserService,
		private messageService: MessageService
	) {}

	ngOnInit(): void {
		this.loadUsers()
	}

	loadUsers(): void {
		this.userService.getUsers().subscribe(users => {
			this.users = users
			this.filteredUsers = users
		})
	}

	onSearch(): void {
		if (!this.searchQuery) {
			this.filteredUsers = this.users
			return
		}

		const query = this.searchQuery.toLowerCase()
		this.filteredUsers = this.users.filter(user =>
			user.name.toLowerCase().includes(query)
		)
	}

	selectUser(user: User): void {
		this.selectedUser = user
	}

	onSendMessage(message: Message): void {
		if (this.selectedUser) {
			this.messageService.sendMessage(message).subscribe(() => {
			})
		}
	}
}
