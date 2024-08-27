import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, Observable } from 'rxjs';

var countRequest = 0;

export function loadingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  console.log("Loading::Interceptor");
  countRequest++;
  const spinner = inject(NgxSpinnerService);
  spinner.show();
  return next(req).pipe(finalize(() => {
    countRequest--;
    if (!countRequest) {
      spinner.hide();
    }
  }));
}
