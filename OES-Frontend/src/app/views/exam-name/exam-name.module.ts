// Angular
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

// Exam Name Components
import { AddExamNameComponent } from "./add-exam-name/add-exam-name.component";
import { ExamNameListComponent } from "./exam-name-list/exam-name-list.component";

// Components Routing
import { ExamNameRoutingModule } from "./exam-name-routing.module";
import { NgxPaginationModule } from "ngx-pagination";
import { SubjectFormArrayComponent } from "./subject-form-array/subject-form-array.component";
import { SubjectFormComponent } from "./subject-form/subject-form.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ExamNameRoutingModule,
  ],
  declarations: [
    AddExamNameComponent, 
    ExamNameListComponent, 
    SubjectFormComponent, 
    SubjectFormArrayComponent],
})
export class ExamNameModule {}
