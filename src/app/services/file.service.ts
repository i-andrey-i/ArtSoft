import { Injectable } from '@angular/core'

import { map, Observable } from 'rxjs'
import { BaseHttpService } from './base/base-http.service'


@Injectable({ providedIn: 'root' })
export class FileService extends BaseHttpService {
    constructor() {
        super()
    }

    download(filename: string): Observable<Blob> {
        const response = this.getFile(`file/${filename}`)

        return response.pipe(
            map(res => {
                const contentType = res.headers.get('Content-Type')
                const data = res.body || new ArrayBuffer(0)
                
                return new Blob([data], { type: contentType || '' })
            })
        )
    }

    // Возвращает имя файла, которое надо будет поместить в attachment
    upload(file: File): Observable<string> {
        const formData = new FormData();
        formData.append('file', file, file.name);

        return this.post<string>(`file/upload`, formData);
    }
}
