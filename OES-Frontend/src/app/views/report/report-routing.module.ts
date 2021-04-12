import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ReportViewComponent } from "./report-view/report-view.component";
import { ReportComponent } from "./report.component";

const routes: Routes = [
  {
    path: "",
    component: ReportComponent
  },
  {
    path: "view-report/:id",
    component: ReportViewComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {}
