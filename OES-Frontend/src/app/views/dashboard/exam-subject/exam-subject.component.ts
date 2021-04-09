import { formatDate } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { TokenStorageService } from "../../../_auth/token-storage.service";
import { Subjects } from "../../../_models/subject";
import { SD } from "../../../_sd";
import { ExamSubjectService } from "../../../_services/exam-subject.service";

@Component({
  selector: "app-exam-subject",
  templateUrl: "exam-subject.component.html"
})
export class ExamSubjectComponent {
  private roles: string[];
  public authority: string;

  errorMessage: string = "";
  badgeColor: string;
  subjectList: Subjects[] = [];
  formGroup: FormGroup;
  checkForm: FormGroup;

  examNameID: any;
  sDates: any;
  data: any;
  today: number;
  currentDateTime: string;

  constructor(
    private token: TokenStorageService,
    private examSubjectService: ExamSubjectService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    let date: Date = new Date();
    this.today = date.getFullYear();

    this.checkForm = this.formBuilder.group({
      semester: [''],
      department: [''],
      year: this.today,
      subject: [''],
      exam : {id: ''}
    })

    if (this.token.getToken()) {
      this.roles = this.token.getAuthorities();
      this.roles.every((role) => {
        if (role === "ROLE_ADMIN") {
          this.authority = SD.admin;
          return false;
        } else if (role === "ROLE_PM") {
          this.authority = SD.teacher;
          return false;
        }
        this.authority = SD.student;
        return true;
      });
    }
    this.loadSubject();
    this.badgeColor = "warning";
  }

  x = setInterval(() => {        
    this.currentDateTime = formatDate(new Date(), 'yyyy-MM-ddTHH:mm', 'en');
  }, 1000);

  loadSubject() {
    this.examNameID = this.route.snapshot.paramMap.get('id');
    this.http.get("http://localhost:8080/api/exam/" + this.examNameID)
      .subscribe((response) => {
        console.log(response);
        let resources = response["data"];
        this.data = resources;
        this.sDates = resources["sDates"];
        console.log(this.sDates);
        
        for(let i=0; i< this.sDates.length; i++) {
          if(this.sDates[i].status == SD.completed) {
            this.badgeColor = 'success';
          }
        }

      })
  }

  viewQuestionPaper(subjectName: string) {
    //Store values in session storage;
    this.examSubjectService.saveSubject(subjectName);
    this.examSubjectService.saveExamID(this.examNameID);
    this.examSubjectService.saveDepartment(this.data.department);
    this.examSubjectService.saveSemester(this.data.semester);

    this.checkForm.patchValue({
      department: this.data.department,
      semester: this.data.semester,
      subject: subjectName,
      exam: {id: Number(this.examNameID)}
    })
    console.log(this.checkForm.value);
    this.http.post("http://localhost:8080/api/exam/" + this.examNameID + '/subject' + '/questions', this.checkForm.value)
      .subscribe(response => {
        if (response['status'] === true) {
          if (this.authority === SD.admin) {
            this.router.navigate(['/dashboard/exam-question-paper']);
          } else if (this.authority === SD.student) {
            this.router.navigate(['/exam-instructions']);
          }
        } else {
          this.toastr.error(response['message']);
        }
      },
        (error) => {
          this.errorMessage = error.error.message;
          this.toastr.error(this.errorMessage);
        })
  }
}