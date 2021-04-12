import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReportRoutingModule } from './report-routing.module';
import { ReportViewComponent } from './report-view/report-view.component';
import { ReportComponent } from './report.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ReportRoutingModule,
  ],
  declarations: [ ReportComponent, ReportViewComponent ]
})
export class ReportModule { }
