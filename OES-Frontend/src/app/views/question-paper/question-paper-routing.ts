import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddQuestionPaperComponent } from "./add-question-paper/add-question-paper.component";
import { ViewQuestionPaperComponent } from "./view-question-paper/view-question-paper.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Question Paper",
    },
    children: [
      {
        path: "",
        redirectTo: "add",
      },
      {
        path: "add",
        component: AddQuestionPaperComponent
      },
      {
        path: "view",
        component: ViewQuestionPaperComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddQuestionPaperRoutingModule {}
