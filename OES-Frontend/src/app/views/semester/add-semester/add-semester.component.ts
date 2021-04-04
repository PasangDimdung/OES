import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Semester } from "../../../_models/semester";
import { SemesterService } from "../../../_services/semester.service";

export enum EditMode {
  Create = 0,
  Edit = 1,
}

@Component({
  selector: "app-add-semester",
  templateUrl: "add-semester.component.html",
})
export class AddSemesterComponent implements OnInit {
  semesterForm: Semester = {} as Semester;
  editMode: EditMode = EditMode.Create;

  isSubmitted: boolean = false;

  form = new FormGroup({
    id: new FormControl(this.semesterForm.id),
    name: new FormControl(this.semesterForm.name, [Validators.required]),
  });

  constructor(
    private semesterService: SemesterService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadSemester();
  }

  loadSemester() {
    if (this.route.snapshot.params.id) {
      this.editMode = EditMode.Edit;
      this.semesterService.getUser(this.route.snapshot.params.id)
      .subscribe((response) => {
        let resources = response["data"];
        this.semesterForm = resources;
        this.form.reset(this.semesterForm);
      });
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.value.id) {
      this.semesterService.update(this.form.value as Semester)
      .subscribe(() => {
        this.isSubmitted = false;
        this.goToSemesterList();
        this.toastr.success("Semester updated successfully");
      });
    } else {
      this.semesterService.submit(this.form.value)
      .subscribe(() => {
        this.isSubmitted = false;
        this.goToSemesterList();
        this.toastr.success("Semester added successfully");
      });
    }
  }

  goToSemesterList() {
    return this.router.navigate(["/semester/list"]);
  }

  onFormReset() {
    this.form.reset();
  }
}
