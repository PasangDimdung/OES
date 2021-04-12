import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { DepartmentService } from "../../../_services/department.service";
import { ExamNameService } from "../../../_services/exam-name.service";
import { QuestionPaperService } from "../../../_services/question-paper.service";
import { SemesterService } from "../../../_services/semester.service";

@Component({
  selector: "app-add-question-paper",
  templateUrl: "add-question-paper.component.html",
})
export class AddQuestionPaperComponent {
  questionPaperForm: FormGroup;

  errorMessage: string = '';

  departments: any;
  semesters: any;
  subjects: any;

  exams: any;

  isSubmitted: boolean = false;

  questionPaperList: Object;
  questionDetails: any;

  selectedYear;
  selectedDepartment = '';
  selectedSemester = '';
  selectedSubject = '';
  selectExamId = '';
  examNameID: number;

  constructor(
    private departmentService: DepartmentService,
    private semesterService: SemesterService,
    private questionPaperService: QuestionPaperService,
    private examNameService: ExamNameService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private http: HttpClient
  ) {}
  ngOnInit() {
    this.loadDepartment();
    this.loadExamName();

    let date: Date = new Date();
    this.selectedYear = date.getFullYear();

    this.questionPaperForm = this.fb.group({
      year: [this.selectedYear],
      department: ['', [Validators.required]],
      semester: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      exam: {id: ''}
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
  }

  onExamNameChange(id: number){
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

  onSubjectChange(){
    this.isSubmitted = true;
  }


  onSubmit() {
    this.isSubmitted = true;
    this.questionPaperForm.patchValue({
        department: this.selectedDepartment["name"],
        year: this.selectedYear,
        semester: this.selectedSemester["name"],
        subject: this.selectedSubject["name"],
        exam: {id: this.examNameID}
    });
    this.questionPaperService.submit(this.questionPaperForm.value)
    .subscribe((response) => {
        this.isSubmitted = false;
        if (response["status"] == true) {
          let resources = response["data"];
          this.questionPaperList = resources;
          this.questionDetails = response["data"][0].questionDetails;
          this.toastr.success(response["message"]);
          this.selectedDepartment = '';
          this.selectedSemester = '';
          this.semesters = [];
          this.selectedSubject = '';
          this.subjects = [];
          this.selectExamId = "";
        } else {
          this.toastr.error(response["message"]);
          this.questionDetails = null;
          this.selectedDepartment = '';
          this.selectedSemester = '';
          this.semesters = [];
          this.selectedSubject = '';
          this.subjects = [];
          this.selectExamId = "";
        }
      },
      (error) => {
        this.isSubmitted = false;
        this.errorMessage = error.error.message;
        this.toastr.error(this.errorMessage);
      }
    );
  }
}
