import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AddSemesterComponent } from "./add-semester/add-semester.component";
import { SemesterListComponent } from "./semester-list/semester-list.component";
import { SemesterResolver } from "../../_resolvers/semester.resolver";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Semester",
    },
    children: [
      {
        path: "",
        redirectTo: "add",
      },
      {
        path: "add",
        component: AddSemesterComponent
      },
      {
        path: "edit/:id",
        component: AddSemesterComponent,
      },
      {
        path: "list",
        component: SemesterListComponent,
        resolve: { semesterResolver: SemesterResolver }
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SemesterRoutingModule {}
