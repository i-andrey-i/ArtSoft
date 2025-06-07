import { Message } from './message.model';

export interface Chat {
    id: string;
    name: string;
    lastMessage: Message;
    newMessagesCount: number;
}
