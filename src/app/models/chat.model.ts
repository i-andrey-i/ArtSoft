import { Message } from "./message.model";

export interface Chat {
    id: string;
    name: string;
    last_message: Message;
    new_messages_count: number;
}
