import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { QuestionTypeResolver } from "../../_resolvers/question-type.resolver";

import { AddQuestionTypeComponent } from "./add-question-type/add-question-type.component";
import { QuestionTypeListComponent } from "./question-type-list/question-type-list.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Department",
    },
    children: [
      {
        path: "",
        redirectTo: "add",
      },
      {
        path: "add",
        component: AddQuestionTypeComponent
      },
      {
        path: "edit/:id",
        component: AddQuestionTypeComponent
      },
      {
        path: "list",
        component: QuestionTypeListComponent,
        resolve: { questionTypeResolver: QuestionTypeResolver }
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionTypeRoutingModule {}
