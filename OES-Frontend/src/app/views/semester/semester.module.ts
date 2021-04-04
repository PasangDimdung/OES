// Angular
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

// Components
import { AddSemesterComponent } from "./add-semester/add-semester.component";
import { SemesterListComponent } from "./semester-list/semester-list.component";

// Components Routing
import { SemesterRoutingModule } from "./semester-routing.module";
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SemesterRoutingModule,
  ],
  declarations: [
    AddSemesterComponent,
    SemesterListComponent
  ],
})
export class SemesterModule {}
