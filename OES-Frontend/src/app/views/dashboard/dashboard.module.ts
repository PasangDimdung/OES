import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { CommonModule } from "@angular/common";
import { NgxPaginationModule } from "ngx-pagination";
import { ExamSubjectComponent } from "./exam-subject/exam-subject.component";
import { ExamQuestionPaperComponent } from "./exam-question-paper/exam-question-paper.component";
import { ExamResult } from "./exam-result/exam-result.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    DashboardRoutingModule,
  ],
  declarations: [
    DashboardComponent, 
    ExamSubjectComponent, 
    ExamQuestionPaperComponent,
    ExamResult
  ],
})
export class DashboardModule {}
