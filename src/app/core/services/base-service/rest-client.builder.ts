import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
import { finalize } from 'rxjs/internal/operators/finalize';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { timeout } from 'rxjs/internal/operators/timeout';
import { environment } from '../../../../environments/environment';
import { RequestMethod } from '../../enums/requst-method.enum';
import { PathModel } from '../../models/path.model';
import { CustomHttpEventObserverService } from './custom-http-event-observer.service';
import { HandleErrorService } from './handle-error.service';
import { HttpParamsDynamic } from './http-params-dynamic';

export interface RestClientSender {
  send<T>(customCatchError: boolean): Observable <T> ;
}

export interface BodyRestClientBuilder {
  body(body: any): RestClientSender;
  addOptions(queryOptions: any): BodyRestClientBuilder & RestClientSender;
}

export interface URLRestClientBuilder {
  url(url: string | PathModel): BodyRestClientBuilder & RestClientSender;
}

export class RESTClientBuilder implements URLRestClientBuilder, RestClientSender, BodyRestClientBuilder {

  _options: any;
  _url: string;
  _body: any;

  constructor(
    public http: HttpClient,
    public _method: RequestMethod,
    public customHttpEventObserverService: CustomHttpEventObserverService,
    public router: Router,
    public handleErrorService: HandleErrorService,
  ) {}

  url(path: string | PathModel): BodyRestClientBuilder & RestClientSender {
    if (path instanceof PathModel) {
      this._url = path.toString();
    } else {
      this._url = path;
    }
    return this;
  }

  addOptions(queryOptions: any) {
    if (queryOptions) {
      this._options = {};
      for (const key of Object.keys(queryOptions)) {
        let value = queryOptions[key];
        if (key === 'params') {
          if (!(queryOptions[key] instanceof HttpParams)) {
            value = HttpParamsDynamic(value);
          }
        }
        this._options[key] = value;
      }
      if (!this._options.headers && !this._options.responseType) {
        this._options.headers  = new HttpHeaders().append('Content-Type', 'application/json');
      }
    }
    return this;
  }

  body(body: any): RestClientSender {
    this._body = body;
    return this;
  }

  send<T>(customCatchError: boolean): Observable <T> {
    let observable: Observable<any> = null;
    this.customHttpEventObserverService.beforeRequest.next();
    switch (this._method) {
      case RequestMethod.Get:
        observable = this.http.get<T>(this._url, this._options);
        break;
      case RequestMethod.Post:
        observable = this.http.post<T>(this._url, this._body, this._options);
        break;
      case RequestMethod.Put:
        observable = this.http.put<T>(this._url, this._body, this._options);
        break;
      case RequestMethod.Delete:
        observable = this.http.delete<T>(this._url, this._options);
        break;
      case RequestMethod.Patch:
        observable = this.http.patch<T>(this._url, this._body, this._options);
        break;
    }
    observable = observable.pipe(
      timeout(environment.timeout),
      takeUntil(this.handleErrorService.unsubscribe),
      catchError((err: any) => {
        // return this.handleErrorService.getErrorByCode(err, customCatchError);
        return err;
      }),
      finalize(() => this.customHttpEventObserverService.afterRequest.next()));
    return observable;
  }

}