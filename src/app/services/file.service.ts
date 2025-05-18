import { Injectable } from '@angular/core'

import { BaseHttpService } from './base/base-http.service'
import { Observable } from 'rxjs'


@Injectable({ providedIn: 'root' })
export class MessageService extends BaseHttpService {
    constructor() {
        super()
    }
    getFile(filename: string): Observable<Blob> {
        return this.get<Blob>(`file/${filename}`)
    }

    // Возвращает имя файла, которое надо будет поместить в attachment
    upload(file: File): Observable<string> {
        return this.post<string>(`file`, file);
    }
}
