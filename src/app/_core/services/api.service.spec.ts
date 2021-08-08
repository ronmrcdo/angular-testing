import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController  } from '@angular/common/http/testing';
import { environment as env } from '@env/environment';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let mockHttp: HttpTestingController;

  const baseUrl = env.api_url;

  beforeEach(waitForAsync(() => {
    TestBed
      .configureTestingModule({
        imports: [
          HttpClientTestingModule
        ]
      });
  }));

  beforeEach(() => {
    service = TestBed.inject(ApiService);
    mockHttp = TestBed.inject(HttpTestingController);
  });

  it('should create api service', () => {
    expect(service).toBeTruthy();
  });

  it('should call get and return success', () => {
    const mockParams = {
      page: 1,
      per_page: 5
    };

    const mockResult = {
      status: 200,
      message: 'Yes!'
    };

    service
      .get('/users', mockParams)
      .subscribe(res => {
        expect(res).toBe(mockResult);
      });

    const req = mockHttp.expectOne(
      request => request.url === `${baseUrl}/users`
    );

    expect(req.request.method).toBe('GET');
    expect(Number(req.request.params.get('page'))).toBe(mockParams.page);
    expect(Number(req.request.params.get('per_page'))).toBe(mockParams.per_page);

    req.flush(mockResult);
  });

  it('should throw error on get', () => {
    const mockResult = {
      status: 400,
      message: 'Error'
    };

    service
      .get('/users')
      .subscribe(
        res => {},
        err => {
          expect(err).toEqual(mockResult);
        }
      );

    const req = mockHttp.expectOne(
      request => request.url === `${baseUrl}/users`
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockResult, { status: 400, statusText: 'Bad Request'});
  });

  it('should call post and return success', () => {
    const mockResult = {
      status: 200,
      message: 'Yes!'
    };

    service
      .post('/users')
      .subscribe(res => {
        expect(res).toBe(mockResult);
      });

    const req = mockHttp.expectOne(
      request => request.url === `${baseUrl}/users`
    );

    expect(req.request.method).toBe('POST');

    req.flush(mockResult);
  });

  it('should throw error on post', () => {
    const mockResult = {
      status: 400,
      message: 'Error'
    };

    service
      .post('/users')
      .subscribe(
        res => {},
        err => {
          expect(err).toEqual(mockResult);
        }
      );

    const req = mockHttp.expectOne(
      request => request.url === `${baseUrl}/users`
    );

    expect(req.request.method).toBe('POST');

    req.flush(mockResult, { status: 400, statusText: 'Bad Request'});
  });
});
