import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ExamNameResolver } from "../../_resolvers/exam-name.resolver";
import { DepartmentResolver } from "../../_resolvers/department.resolver";

import { AddExamNameComponent } from "./add-exam-name/add-exam-name.component";
import { ExamNameListComponent } from "./exam-name-list/exam-name-list.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Exam Name",
    },
    children: [
      {
        path: "",
        redirectTo: "add",
      },
      {
        path: "add",
        component: AddExamNameComponent,
        resolve: { departmentResolver: DepartmentResolver }
      },
      {
        path: "edit/:id",
        component: AddExamNameComponent,
      },
      {
        path: "list",
        component: ExamNameListComponent,
        resolve: { examNameResolver: ExamNameResolver }
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamNameRoutingModule {}
