import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController  } from '@angular/common/http/testing';
import { environment as env } from '@env/environment';

import { CustomerService } from './customer.service';
import { Customer } from '../interfaces';

describe('CustomerService', () => {
  let service: CustomerService;
  let mockHttp: HttpTestingController;

  const baseUrl = env.api_url;

  const mockCustomers: Customer[] = [
    {
      "id": 7,
      "email": "michael.lawson@reqres.in",
      "first_name": "Michael",
      "last_name": "Lawson",
      "avatar": "https://reqres.in/img/faces/7-image.jpg"
    },
    {
      "id": 8,
      "email": "lindsay.ferguson@reqres.in",
      "first_name": "Lindsay",
      "last_name": "Ferguson",
      "avatar": "https://reqres.in/img/faces/8-image.jpg"
    },
    {
      "id": 9,
      "email": "tobias.funke@reqres.in",
      "first_name": "Tobias",
      "last_name": "Funke",
      "avatar": "https://reqres.in/img/faces/9-image.jpg"
    },
    {
      "id": 10,
      "email": "byron.fields@reqres.in",
      "first_name": "Byron",
      "last_name": "Fields",
      "avatar": "https://reqres.in/img/faces/10-image.jpg"
    },
    {
      "id": 11,
      "email": "george.edwards@reqres.in",
      "first_name": "George",
      "last_name": "Edwards",
      "avatar": "https://reqres.in/img/faces/11-image.jpg"
    },
    {
      "id": 12,
      "email": "rachel.howell@reqres.in",
      "first_name": "Rachel",
      "last_name": "Howell",
      "avatar": "https://reqres.in/img/faces/12-image.jpg"
    }
  ];

  beforeEach(waitForAsync(() => {
    TestBed
      .configureTestingModule({
        imports: [
          HttpClientTestingModule
        ]
      });
  }));

  beforeEach(() => {
    service = TestBed.inject(CustomerService);
    mockHttp = TestBed.inject(HttpTestingController);
  });

  it('should create customer service', () => {
    expect(service).toBeTruthy();
  });

  it('should get customer list', () => {
    const mockQuery = {
      page: 1,
      per_page: 6
    };

    const mockResponse = {
      total: 12,
      total_pages: 12,
      data: mockCustomers,
      ...mockQuery
    };

    service
      .getCustomerList(mockQuery)
      .subscribe(res => {
        expect(res).toBe(mockResponse);
      });

    const req = mockHttp.expectOne(
      request => request.url === `${baseUrl}/users`
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

  it('should throw error when fetching customer list', () => {
    const mockQuery = {
      page: 1,
      per_page: 6
    };

    const mockResult = {
      status: 400,
      message: 'Error'
    };

    service
      .getCustomerList(mockQuery)
      .subscribe(
        res => {},
        err => {
          expect(err).toEqual(mockResult)
        }
      );

    const req = mockHttp.expectOne(
      request => request.url === `${baseUrl}/users`
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockResult, { status: 400, statusText: 'Bad Request'});
  });

  it('should get customer by id', () => {
    const mockCustomer = mockCustomers[0];

    const mockResponse = {
      data: mockCustomer
    };

    service
      .getCustomerById(mockCustomer.id)
      .subscribe(res => {
        expect(res).toBe(mockCustomer);
      });

    const req = mockHttp.expectOne(
      request => request.url === `${baseUrl}/users/${mockCustomer.id}`
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

  it('should throw error when fetching customer by id', () => {

    const mockResult = {
      status: 404,
      message: 'Not found'
    };

    service
      .getCustomerById(1)
      .subscribe(
        res => {},
        err => {
          expect(err).toEqual(mockResult)
        }
      );

    const req = mockHttp.expectOne(
      request => request.url === `${baseUrl}/users/1`
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockResult, { status: 404, statusText: 'Not found'});
  });
});
