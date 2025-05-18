export interface Message {
	id: number;
	fromUserId: string;
	isRead: boolean;
	text: string;
	createdAt: string;
	attachment?: string;
}

