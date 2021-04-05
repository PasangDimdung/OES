import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Department } from "../../../_models/department";
import { QuestionType } from "../../../_models/question-type";
import { Semester } from "../../../_models/semester";
import { Subjects } from "../../../_models/subject";
import { Unit } from "../../../_models/unit";
import { QuestionDetailService } from "../../../_services/question-details.service";
import { QuestionTypeService } from "../../../_services/question-type.service";
import { SemesterService } from "../../../_services/semester.service";
import { SubjectService } from "../../../_services/subject.service";

@Component({
  templateUrl: "add-question.component.html",
})
export class AddQuestionComponent implements OnInit {
  errorMessage = "";
  questionForm: FormGroup;

  selectedPoints: number;
  seletedTitle: string;
  selectedOption: string;
  selectedAnswer: string;

  selectedUnit = "";
  selectedType = "";
  selectedYear;
  selectedSubject = "";
  selectedSemester = "";
  selectedDepartment = "";

  isAddOption: boolean = false;

  units: Unit[];
  subjects: Subjects[];
  semesters: Semester[];
  types: QuestionType[];
  departments: Department[];

  constructor(
    private semesterService: SemesterService,
    private subjectService: SubjectService,
    private questionTypeService: QuestionTypeService,
    private questionDetailsService: QuestionDetailService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    let date: Date = new Date();
    this.selectedYear = date.getFullYear();
    this.questionForm = this.fb.group({
      questionDetails: this.fb.group({
        department: [''],
        year: [''],
        academic_year: [''],
        semester: [''],
        type: [''],
        subject: [''],
      }),
      points: [''],
      title: ['', [Validators.required]],
      subjectUnit: this.fb.group({
        id: [''],
      }),
      op: this.fb.array([this.addOptionGroup()]),
      answer: this.fb.group({
        answer: ['', [Validators.required]],
      }),
    });
    this.loadDepartment();
  }

  get optionArray() {
    return <FormArray>this.questionForm.get("op");
  }

  addOptionGroup() {
    return this.fb.group({
      op: ['', [Validators.required]],
    });
  }

  addOption() {
    if (this.optionArray.length <= 3) {
      this.optionArray.push(this.addOptionGroup());
      if (this.optionArray.length === 4) {
        this.isAddOption = true;
      }
    }
  }

  loadDepartment() {
    this.route.data.subscribe((response) => {
      let resources = response.departmentResolver["data"];
      this.departments = resources;
    });
  }

  loadSemester() {
    this.semesterService.getAll()
      .subscribe((response) => {
        let resources = response["data"];
        this.semesters = resources;
      });

  }

  loadQuestionType() {
    this.questionTypeService.getAll()
      .subscribe((response) => {
        let resources = response["data"];
        this.types = resources;
      });
  }

  onDepartmentChange() {
    this.loadSemester();
    this.selectedSubject = '';
    this.selectedSemester = '';
    this.subjects = [];
    this.selectedUnit = '';
    this.units = [];
  }

  onSemesterChange() {
    this.selectedUnit = '';
    this.selectedSubject = '';
    this.units = [];
    this.http.get("http://localhost:8080/api/department/" + this.selectedDepartment["id"] + '/semester/' + this.selectedSemester["id"] + '/subjects')
      .subscribe(response => {
        let resources = response["data"];
        this.subjects = resources;
      })
  }

  onSubjectChange() {
    this.selectedUnit = '';
    this.subjectService
      .getUser(this.selectedSubject["id"])
      .subscribe((response) => {
        let resources = response["data"];
        this.units = resources;
        this.units = resources["units"];
      });
  }

  onUnitChange() {
    this.loadQuestionType();
  }

  onSubmit() {
    this.questionForm.patchValue({
      questionDetails: {
        department: this.selectedDepartment["name"],
        year: this.selectedYear,
        academic_year: "First year",
        semester: this.selectedSemester["name"],
        type: this.selectedType["name"],
        subject: this.selectedSubject["name"]
      },
      points: this.selectedPoints,
      subjectUnit: {
        id: this.selectedUnit["id"],
      },
    });
    console.log(this.questionForm.value);
    this.questionDetailsService.submit(this.questionForm.value)
      .subscribe((response) => {
        this.toastr.success(response["message"]);
        this.questionForm.reset();
      },
        (error) => {
          this.errorMessage = error.error.message;
          this.toastr.error(this.errorMessage);
        }
      );
  }

  onFormReset() {
    this.questionForm.reset();
  }
}
