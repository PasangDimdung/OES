import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddSubjectComponent } from "./add-subject/add-subject.component";
import { AddUnitComponent } from "./add-unit/add-unit.component";
import { SubjectListComponent } from "./subject-list/subject-list.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Subject",
    },
  },
  {
    path: "add",
    component: AddSubjectComponent
  },
  {
    path: "list",
    component: SubjectListComponent
  },
  {
    path: "add-unit/:id",
    component: AddUnitComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubjectRoutingModule {}
