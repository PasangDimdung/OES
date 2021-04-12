import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { TokenStorageService } from "../../../_auth/token-storage.service";
import { ExamSubjectService } from "../../../_services/exam-subject.service";
import { UserService } from "../../../_services/user.service";

@Component({
    templateUrl: "report-view.component.html"
})
export class ReportViewComponent implements OnInit {
    errorMessage: string = '';
    score: any;
    subjectName: any;
    fullMarks: any;
    passMarks: any;

    form = this.fb.group({
        exam: {
            id: this.examSubjectService.getExamId()
        },
        student: {
            id: this.tokenStorageService.getUserId()
        }
    })
    department: any;
    registrationNumber: any;
    userName: any;
    academicYear: any;
    semester: any;
    dated: Date;
    result: any;
    studentReport = [];

    var1 = true;
    var2 = true;
    var3: any;

    constructor(
        private http: HttpClient,
        private fb: FormBuilder,
        private examSubjectService: ExamSubjectService,
        private tokenStorageService: TokenStorageService,
        private userService: UserService,
        private toastr: ToastrService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.form.patchValue({
            exam: {
                id: this.route.snapshot.paramMap.get('id')
            },
            student: {
                id: this.tokenStorageService.getUserId()
            },
            subject: {
                id: this.userService.getSubjectId()
            }
        })
        this.http.post("http://localhost:8080/api/exam/get-report", this.form.value)
            .subscribe(response => {
                this.studentReport = response['data'];
                console.log(this.studentReport);
                this.dated = new Date()

                for (let index = 0; index < this.studentReport.length; index++) {
                    this.score = this.studentReport[index]['marksObtained'];
                    this.passMarks = this.studentReport[index]['subjectPassMarks'];
                    if (this.passMarks > this.score) {
                        this.var2 = false;
                    } else {
                        this.var2 = true;
                    }
                    this.var3 = this.var2 && this.var1;
                    this.var1 = this.var3;
                }
            })
    }
}