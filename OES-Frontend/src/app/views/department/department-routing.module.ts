import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DepartmentResolver } from "../../_resolvers/department.resolver";

import { AddDepartmentComponent } from "./add-department/add-department.component";
import { DepartmentListComponent } from "./department-list/department-list.component";

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
        component: AddDepartmentComponent
      },
      {
        path: "edit/:id",
        component: AddDepartmentComponent,
      },
      {
        path: "list",
        component: DepartmentListComponent,
        resolve: { departmentResolver: DepartmentResolver }
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepartmentRoutingModule {}
