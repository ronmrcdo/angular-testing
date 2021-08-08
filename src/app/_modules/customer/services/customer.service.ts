import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@core/services';
import { Customer } from '../interfaces';
import { PaginationResponse, PageState } from '@core/interfaces';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private _apiService: ApiService) { }

  getCustomerList(pageState: PageState): Observable<PaginationResponse> {
    const pagination = {
      ...pageState,
      page: pageState.page + 1
    };

    return this._apiService.get('/users', pagination);
  }

  getCustomerById(customerId: number): Observable<Customer> {
    return this._apiService.get(`/users/${customerId}`)
      .pipe(
        map((res: any) => res.data)
      );
  }
}
