import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { QuestionType } from "../../../_models/question-type";
import { QuestionTypeService } from "../../../_services/question-type.service";

export enum EditMode {
  Create = 0,
  Edit = 1,
}

@Component({
  selector: "app-add-department",
  templateUrl: "add-question-type.component.html",
})
export class AddQuestionTypeComponent implements OnInit {
  questionTypeForm: QuestionType = {} as QuestionType;
  editMode: EditMode = EditMode.Create;

  isSubmitted: boolean = false;

  form = new FormGroup({
    id: new FormControl(this.questionTypeForm.id),
    name: new FormControl(this.questionTypeForm.name, [Validators.required]),
  });

  constructor(
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
      this.questionTypeService.getUser(this.route.snapshot.params.id)
      .subscribe((response) => {
        let resources = response["data"];
        this.questionTypeForm = resources;
        this.form.reset(this.questionTypeForm);
      });
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.value.id) {
      this.questionTypeService.update(this.form.value as QuestionType)
      .subscribe(() => {
        this.isSubmitted = false;
        this.onFormReset();
        this.goToQuestionTypeList();
      });
    } else {
      this.questionTypeService.submit(this.form.value)
      .subscribe(() => {
        this.isSubmitted = false;
        this.onFormReset();
        this.toastr.success("Question Type added successfully");
        this.goToQuestionTypeList();
      });
    }
  }

  onFormReset() {
    this.form.reset();
  }

  goToQuestionTypeList() {
    return this.router.navigate(["/question-type/list"]);
  }
}
