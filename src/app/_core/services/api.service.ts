import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment as env } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  protected readonly baseUrl: string = env.api_url;

  private _formatErrors(error: any): Observable<any> {
    return throwError({ ...error.error });
  }

  constructor(private _httpClient: HttpClient) {}

  get(endpoint: string, queryParams: any = {}): Observable<any> {
    return this._httpClient.get(
      `${this.baseUrl}${endpoint}`,
      {
        params: {
          ...queryParams
        }
      }
    ).pipe(catchError(this._formatErrors));
  }

  post(endpoint: string, payload: any = {}, headers: any = {}): Observable<any> {
    return this._httpClient.post(
        `${this.baseUrl}${endpoint}`,
        payload,
        headers
      ).pipe(catchError(this._formatErrors));
  }
}
