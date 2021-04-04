import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DepartmentResolver } from "../../_resolvers/department.resolver";
import { AddQuestionComponent } from "./add-question/add-question.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Question",
    },
    children: [
      {
        path: "",
        redirectTo: "add",
      },
      {
        path: "add",
        component: AddQuestionComponent,
        resolve: { departmentResolver: DepartmentResolver }
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionRoutingModule {}
