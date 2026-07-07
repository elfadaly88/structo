import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {
  handleError(error: any): void {
    const errorMsg = error?.message || error?.toString() || '';
    
    // Check if it's a chunk loading / dynamic import error
    if (
      errorMsg.includes('Failed to fetch dynamically imported module') ||
      errorMsg.includes('Loading chunk') ||
      errorMsg.includes('ChunkLoadError')
    ) {
      console.warn('Chunk load/dynamic import error detected. Performing a hard reload to fetch the latest code version...');
      window.location.reload();
      return;
    }
    
    // Log the error to console as usual
    console.error(error);
  }
}
