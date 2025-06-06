import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ErrorHandlerService {
    handleError(error: any): void {
        console.log(error);
    }

    handleServerStart(port: number): void {
        console.log(
            `Node Express server listening on http://localhost:${port}`
        );
    }

    handleBootstrapError(error: any): void {
        console.error(error);
    }

    handleDebug(data: any): void {
        console.log(data);
    }
}
