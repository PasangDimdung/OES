// Angular
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { NgxPaginationModule } from "ngx-pagination";
import { AcademicYearRoutingModule } from "./academic-year-routing.module";
import { AcademicYearListComponent } from "./academic-year-list/academic-year-list.component";
import { AddAcademicYearComponent } from "./add-academic-year/add-academic-year.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    AcademicYearRoutingModule,
  ],
  declarations: [AcademicYearListComponent, AddAcademicYearComponent],
})
export class AcademicYearModule {}
