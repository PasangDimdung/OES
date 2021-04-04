// Angular
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

// Exam Name Components
import { AddDepartmentComponent } from "./add-department/add-department.component";
import { DepartmentListComponent } from "./department-list/department-list.component";

// Components Routing
import { DepartmentRoutingModule } from "./department-routing.module";
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    DepartmentRoutingModule,
  ],
  declarations: [
    AddDepartmentComponent, 
    DepartmentListComponent
  ],
})
export class DepartmentModule {}
