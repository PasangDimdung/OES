import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Department } from "../../../_models/department";

@Component({
  selector: "app-department-list",
  templateUrl: "department-list.component.html",
})
export class DepartmentListComponent implements OnInit {
  departmentList: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.loadDepartment();
  }

  loadDepartment() {
    this.route.data.subscribe((response) => {
      let resources = response.departmentResolver["data"];
      this.departmentList = resources;
    });
  }

  trackById(index: number, trackDepartment: Department): number {
    return trackDepartment.id;
  }
}
