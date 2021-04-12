import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AcademicYearListComponent } from "./academic-year-list/academic-year-list.component";
import { AddAcademicYearComponent } from "./add-academic-year/add-academic-year.component";

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
        component: AddAcademicYearComponent
      },
      {
        path: "edit/:id",
        component: AddAcademicYearComponent
      },
      {
        path: "list",
        component: AcademicYearListComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcademicYearRoutingModule {}
