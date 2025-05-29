export interface Message {
	id: string;
	fromUserId: string;
	isRead: boolean;
	text: string;
	createdAt: string;
	active?: boolean;
	attachment?: string;
}

