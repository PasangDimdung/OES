import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { CommonModule } from "@angular/common";
import { SubjectRoutingModule } from "./subject-routing.module";
import { SubjectListComponent } from "./subject-list/subject-list.component";
import { AddSubjectComponent } from "./add-subject/add-subject.component";
import { NgxPaginationModule } from "ngx-pagination";
import { AddUnitComponent } from "./add-unit/add-unit.component";

@NgModule({
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
    SubjectRoutingModule, 
    NgxPaginationModule
  ],
  declarations: [
    AddSubjectComponent, 
    SubjectListComponent, 
    AddUnitComponent
  ],
})
export class SubjectModule {}
