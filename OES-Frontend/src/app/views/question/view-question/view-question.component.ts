import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { DepartmentService } from "../../../_services/department.service";
import { ExamNameService } from "../../../_services/exam-name.service";
import { QuestionPaperService } from "../../../_services/question-paper.service";
import { SemesterService } from "../../../_services/semester.service";
import { SubjectService } from "../../../_services/subject.service";

@Component({
  selector: "view-question-paper",
  templateUrl: "view-question.component.html",
})
export class ViewQuestionComponent {
  form: FormGroup;

  errorMessage: string = '';

  departments: any;
  semesters: any;
  subjects: any;

  exams: any;

  isSubmitted: boolean = false;

  questionList: Object;
  questionDetails: any;

  selectedYear;
  selectedDepartment = '';
  selectedSemester = '';
  selectedSubject = '';
  selectExamId = '';
  selectedUnit = "";

  examNameID: number;
  units: any;

  constructor(
    private departmentService: DepartmentService,
    private semesterService: SemesterService,
    private questionPaperService: QuestionPaperService,
    private examNameService: ExamNameService,
    private subjectService: SubjectService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private http: HttpClient
  ) {}
  ngOnInit() {
    this.loadDepartment();
    this.loadExamName();

    let date: Date = new Date();
    this.selectedYear = date.getFullYear();

    this.form = this.fb.group({
      department: ['', [Validators.required]],
      semester: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      unit: ['']
    });
  }

  loadExamName() {
    this.examNameService.getAll()
    .subscribe(response => {
      let resources = response["data"];
      this.exams = resources;
    })
  }
  loadDepartment() {
    this.departmentService.getAll()
    .subscribe((response) => {
      let resources = response["data"];
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

  onDepartmentChange() {
    this.loadSemester();
    this.selectedSubject = '';
    this.selectedSemester = '';
    this.subjects = [];
    this.selectedUnit = '';
    this.units = [];
  }

  onExamNameChange(id: number){
    console.log(id);
    this.examNameID = id; 
  }

  onSemesterChange() {
    this.selectedSubject = '';
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
    this.isSubmitted = true;
  }


  onSubmit() {
    this.isSubmitted = true;
    this.form.patchValue({
        department: this.selectedDepartment["name"],
        semester: this.selectedSemester["name"],
        subject: this.selectedSubject["name"],
        unit: this.selectedUnit["unit"]
    });
    this.http.post("http://localhost:8080/api/question/filter/", this.form.value)
    .subscribe(response => {
        this.isSubmitted = false;
        if (response["status"] == true) {
          let resources = response["data"];
          this.questionList = resources;
          this.questionDetails = response["data"][0].questionDetails;
          this.toastr.success(response["message"]);
          this.selectedDepartment = '';
          this.selectedSemester = '';
          this.semesters = [];
          this.selectedSubject = '';
          this.subjects = [];
          this.selectExamId = "";
          this.units = [];
          this.selectedUnit = "";
        } else {
          this.toastr.error(response["message"]);
          this.questionDetails = null;
          this.selectedDepartment = '';
          this.selectedSemester = '';
          this.semesters = [];
          this.selectedSubject = '';
          this.subjects = [];
          this.selectExamId = "";
          this.units = [];
          this.selectedUnit = "";
        }
    }, 
    (error) => {
        this.isSubmitted = false;
        this.errorMessage = error.error.message;
        this.toastr.error(this.errorMessage);
    })
  }
}
