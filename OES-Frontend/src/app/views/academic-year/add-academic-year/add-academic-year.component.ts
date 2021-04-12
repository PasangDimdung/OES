import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AcademicYear } from "../../../_models/academic-year";
import { QuestionType } from "../../../_models/question-type";
import { AcademicYearService } from "../../../_services/academic-year.service";
import { QuestionTypeService } from "../../../_services/question-type.service";

export enum EditMode {
  Create = 0,
  Edit = 1,
}

@Component({
  selector: "app-add-academic-year",
  templateUrl: "add-academic-year.component.html",
})
export class AddAcademicYearComponent implements OnInit {
  academicYearForm: AcademicYear = {} as AcademicYear;
  editMode: EditMode = EditMode.Create;

  isSubmitted: boolean = false;

  form = new FormGroup({
    id: new FormControl(this.academicYearForm.id),
    name: new FormControl(this.academicYearForm.name, [Validators.required]),
  });

  constructor(
    private academicYearService: AcademicYearService,
    private questionTypeService: QuestionTypeService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadQuestionType();
  }

  loadQuestionType() {
    if (this.route.snapshot.params.id) {
      this.editMode = EditMode.Edit;
      this.academicYearService.getUser(this.route.snapshot.params.id)
      .subscribe((response) => {
        let resources = response["data"];
        this.academicYearForm = resources;
        this.form.reset(this.academicYearForm);
      });
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.value.id) {
      this.academicYearService.update(this.form.value as QuestionType)
      .subscribe((response) => {
        this.isSubmitted = false;
        this.onFormReset();
        this.toastr.success(response['message']);
        this.goToQuestionTypeList();
      });
    } else {
      this.academicYearService.submit(this.form.value)
      .subscribe((response) => {
        this.isSubmitted = false;
        this.onFormReset();
        this.toastr.success(response['message']);
        this.goToQuestionTypeList();
      });
    }
  }

  onFormReset() {
    this.form.reset();
  }

  goToQuestionTypeList() {
    return this.router.navigate(["/academic-year/list"]);
  }
}
