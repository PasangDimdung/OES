import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Department } from "../../../_models/department";
import { DepartmentService } from "../../../_services/department.service";

export enum EditMode {
  Create = 0,
  Edit = 1,
}

@Component({
  selector: "app-add-department",
  templateUrl: "add-department.component.html",
})
export class AddDepartmentComponent implements OnInit {
  errorMessage: string = '';
  departmentForm: Department = {} as Department;
  editMode: EditMode = EditMode.Create;

  form = new FormGroup({
    id: new FormControl(this.departmentForm.id),
    name: new FormControl(this.departmentForm.name, [Validators.required]),
  });

  constructor(
    private departmentService: DepartmentService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadDepartment();
  }

  loadDepartment() {
    if (this.route.snapshot.params.id) {
      this.editMode = EditMode.Edit;
      this.departmentService.getUser(this.route.snapshot.params.id)
      .subscribe((response) => {
        console.log(response);
        let resources = response["data"];
        this.departmentForm = resources;
        this.form.reset(this.departmentForm);
      });
    }
  }

  onSubmit() {
    if (this.form.value.id) {
      this.departmentService.update(this.form.value as Department)
      .subscribe(() => {
          this.goToDepartmentList();
          this.toastr.success("Department updated successfully");
        },
        (error) => {
          this.errorMessage = error.error.message;
          this.toastr.error(this.errorMessage);
        }
      );
    } else {
      this.departmentService.submit(this.form.value)
      .subscribe(() => {
          this.goToDepartmentList();
          this.toastr.success("Department added successfully");
        },
        (error) => {
          this.errorMessage = error.error.message;
          this.toastr.error(this.errorMessage);
        }
      );
    }
  }

  goToDepartmentList() {
    return this.router.navigate(["/department/list"]);
  }

  onFormReset() {
    this.form.reset();
  }
}
