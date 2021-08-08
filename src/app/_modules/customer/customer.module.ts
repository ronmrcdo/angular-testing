import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CustomerRouting } from './customer.routing';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { CustomerListComponent } from './pages/customer-list/customer-list.component';

@NgModule({
  declarations: [CustomerListComponent],
  imports: [
    SharedModule,
    CustomerRouting,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class CustomerModule { }
