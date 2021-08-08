import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PageState, PaginationResponse } from '@core/interfaces';
import { Customer } from '../../interfaces';
import { CustomerService } from '../../services';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  public loading = false;
  public pageState: PageState = {
    page: 0,
    per_page: 5,
    total: 0
  };
  public displayedColumns: string[] = [
    'id', 'email', 'first_name', 'last_name'
  ];

  public dataSource = new MatTableDataSource<Customer[]>([]);

  @ViewChild(MatPaginator, { static: true })
  public paginator: MatPaginator;

  constructor(private _customerService: CustomerService) { }

  ngOnInit(): void {
    this.fetchCustomers({
      pageIndex: 0,
      pageSize: this.pageState.per_page,
      length: this.pageState.total
    });
  }

  fetchCustomers(pagination: PageEvent): void {
    this.loading = true;
    Object.assign(this.pageState, { page: pagination.pageIndex });
    this._customerService.getCustomerList(this.pageState)
      .subscribe(
        (result: PaginationResponse) => {
          Object.assign(this.paginator, { length: result.total });
          this.dataSource.data = result.data;
          this.loading = false;
        },
        (err: any) => this.loading = false
      )
  }
}
