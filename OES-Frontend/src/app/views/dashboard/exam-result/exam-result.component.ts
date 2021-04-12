import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { TokenStorageService } from "../../../_auth/token-storage.service";
import { ExamSubjectService } from "../../../_services/exam-subject.service";
import { UserService } from "../../../_services/user.service";

@Component({
    templateUrl: "exam-result.component.html"
})
export class ExamResult implements OnInit {
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
        },
        subject: {
            id: this.userService.getSubjectId()
        }
    })
    department: any;
    registrationNumber: any;
    userName: any;
    academicYear: any;
    semester: any;
    dated: Date;
    result: any;
    studentReport: any;

    var1 = true;
    var2 = true;
    var3: any;

    constructor(
        private http: HttpClient,
        private fb: FormBuilder,
        private examSubjectService: ExamSubjectService,
        private tokenStorageService: TokenStorageService,
        private userService: UserService,
        private toastr: ToastrService
    ) { }

    ngOnInit() {
        this.form.patchValue({
            exam: {
                id: this.examSubjectService.getExamId()
            },
            student: {
                id: this.tokenStorageService.getUserId()
            },
            subject: {
                id: this.userService.getSubjectId()
            }
        })
        this.http.post("http://localhost:8080/api/exam/report", this.form.value)
            .subscribe(res => {
                console.log(res);
                if (res['status'] == true) {
                    this.http.post("http://localhost:8080/api/exam/get-report", this.form.value)
                        .subscribe(response => {
                            this.studentReport = response['data'];
                            this.dated = new Date()
                            console.log(this.studentReport);

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
                } else {
                    this.toastr.error('Error');
                }
            },
                (error) => {
                    this.errorMessage = error.error.message;
                    this.toastr.error(this.errorMessage);
                }
            )
    }
}