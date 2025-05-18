export interface MessageSendDTO {
    toUserId: string;
    text: string;
    createdAt: string;
    attachment?: string;
}