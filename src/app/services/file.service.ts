import { Injectable } from '@angular/core'

import { BaseHttpService } from './base/base-http.service'
import { Observable } from 'rxjs'


@Injectable({ providedIn: 'root' })
export class FileService extends BaseHttpService {
    constructor() {
        super()
    }

    getFile(filename: string): Observable<File> {
        return this.get<File>(`file/${filename}`)
    }

    // Возвращает имя файла, которое надо будет поместить в attachment
    upload(file: File): Observable<string> {
        return this.post<string>(`file`, file);
    }
}
