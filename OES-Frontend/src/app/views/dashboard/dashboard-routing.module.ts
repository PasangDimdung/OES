import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ExamNameResolver } from "../../_resolvers/exam-name.resolver";

import { DashboardComponent } from "./dashboard.component";
import { ExamQuestionPaperComponent } from "./exam-question-paper/exam-question-paper.component";
import { ExamResult } from "./exam-result/exam-result.component";
import { ExamSubjectComponent } from "./exam-subject/exam-subject.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    resolve: { examNameResolver: ExamNameResolver }
  },
  {
    path: "exam-subject/:id",
    component: ExamSubjectComponent
  },
  {
    path: "exam-question-paper",
    component: ExamQuestionPaperComponent
  },
  {
    path: "exam-result",
    component: ExamResult
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
