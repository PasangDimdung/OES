import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { Department } from "../../../_models/department";
import { DepartmentService } from "../../../_services/department.service";

@Component({
  selector: "app-department-list",
  templateUrl: "department-list.component.html",
})
export class DepartmentListComponent implements OnInit {
  errorMessage: string = '';
  departmentList: any;

  private _refresh$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private departmentService: DepartmentService,
    private toastr: ToastrService
  ) { }

  get refresh$() {
    return this._refresh$;
  }

  ngOnInit() {
    this.loadDepartment();
    this.refresh$.subscribe(() => {
      this.departmentService.getAll()
      .subscribe((response) => {
        let resources = response["data"];
        this.departmentList = resources;
      });
    });
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

  onDelete(id: number) {
    this.departmentService.deleteList(id)
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      )
      .subscribe(
        response => {
          console.log(response);
          if(response['status'] == true){
            this.toastr.success(response["message"]);
          } else {
            this.toastr.success(response["message"]);
          }
        },
        (error) => {
          this.errorMessage = error.error.message;
          this.toastr.error(this.errorMessage);
        }
      );
  }
}
