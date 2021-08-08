import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SharedModule } from '@shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { CustomerListComponent } from './customer-list.component';
import { CustomerService } from '../../services';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';

import { Customer } from '../../interfaces';

describe('CustomerListComponent', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;
  let service: CustomerService;
  let el: DebugElement;

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
        declarations: [CustomerListComponent],
        imports: [
          SharedModule,
          HttpClientTestingModule,
          NoopAnimationsModule,
          MatTableModule,
          MatPaginatorModule
        ]
      }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListComponent);
    service = TestBed.inject(CustomerService);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create customer list component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the table and column', () => {
    const mockResponse = {
      page: 1,
      per_page: 5,
      total: 0,
      total_pages: 0,
      data: []
    };

    spyOn(service, 'getCustomerList')
      .and
      .returnValue(of(mockResponse));

    fixture.detectChanges();

    const tableEl = el.query(By.css('table.mat-table'));
    const thEl = el.queryAll(By.css('th.mat-header-cell'));

    expect(tableEl).toBeTruthy();
    expect(thEl.length).toBe(component.displayedColumns.length);
  });

  it('should render no results on table', () => {
    const mockResponse = {
      page: 1,
      per_page: 5,
      total: 0,
      total_pages: 0,
      data: []
    };

    spyOn(service, 'getCustomerList')
      .and
      .returnValue(of(mockResponse));

    fixture.detectChanges();

    const tdNoResultEl = el.query(By.css('td.no--result'));

    expect(tdNoResultEl).toBeTruthy();
    expect(tdNoResultEl.nativeElement.textContent).toContain('No results found.');
  });

  it('should render customers on table', () => {
    const mockResponse = {
      page: 1,
      per_page: mockCustomers.length,
      total: mockCustomers.length,
      total_pages: 0,
      data: mockCustomers
    };

    spyOn(service, 'getCustomerList')
      .and
      .returnValue(of(mockResponse));

    fixture.detectChanges();

    const customRowEl = el.queryAll(By.css('tr.mat-row'));

    expect(customRowEl.length).toBe(mockCustomers.length);
  });

  it('should render paginator', () => {
    const paginatorEl = el.query(By.css('mat-paginator'));

    expect(paginatorEl).toBeTruthy();
  });

  it('should call next page', () => {
    spyOn(component, 'ngOnInit')
      .and
      .callFake(() => {});

    Object.assign(component.pageState, {
      page: 1,
      per_page: mockCustomers.length,
      total: mockCustomers.length
    });

    Object.assign(component.paginator, { length: mockCustomers.length });

    const mockResponse = {
      page: 1,
      per_page: mockCustomers.length,
      total: mockCustomers.length,
      total_pages: 0,
      data: mockCustomers
    };

    const fetchCustomerSpy = spyOn(component, 'fetchCustomers')
      .and
      .callThrough();

    const fetchSpy = spyOn(service, 'getCustomerList')
      .and
      .returnValue(of(mockResponse));

    fixture.detectChanges();

    const nextEl = el.query(By.css('button.mat-paginator-navigation-next'));

    expect(nextEl).toBeTruthy();

    nextEl.nativeElement.click();

    expect(fetchCustomerSpy).toHaveBeenCalled();
    expect(fetchSpy).toHaveBeenCalled();
  });
});
