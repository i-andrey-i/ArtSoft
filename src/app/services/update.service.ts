import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Message } from '../models/message.model';
import { tokenStore } from './models/token-store';

@Injectable({ providedIn: 'root' })
export class UpdateService {
    update(callback: (message: Message) => void): WebSocket {
        const websocket = this.connect()
        websocket.addEventListener('message', (event: MessageEvent): void => {
            const message = JSON.parse(event.data) as Message;
            callback(message)
        })

        return websocket
    }

    connect(): WebSocket {
        const ws = new WebSocket(environment.WebSocketUrl)
		
		ws.addEventListener('open', (): void => {
			ws.send(tokenStore.get()?.accessToken || '')
		})
		ws.addEventListener('close', (): void => {
			ws.close()
		})
   
        return ws;
    }
}