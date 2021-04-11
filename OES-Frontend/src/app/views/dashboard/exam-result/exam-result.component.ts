import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { TokenStorageService } from "../../../_auth/token-storage.service";
import { SD } from "../../../_sd";
import { ExamSubjectService } from "../../../_services/exam-subject.service";
import { UserService } from "../../../_services/user.service";

@Component({
    templateUrl:"exam-result.component.html"
})
export class ExamResult implements OnInit{
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

    constructor(
        private http : HttpClient, 
        private fb: FormBuilder,
        private examSubjectService: ExamSubjectService,
        private tokenStorageService: TokenStorageService,
        private userService: UserService,
        private toastr: ToastrService
        ){}

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
            if(res['status'] == true){
                this.http.post("http://localhost:8080/api/exam/get-report", this.form.value)
                .subscribe(response => {
                    console.log(response);
                    var resources = response['data'];
                    this.score = resources[0]['marksObtained'];
                    this.subjectName = resources[0]['subjectName'];
                    this.fullMarks = resources[0]['subjectFullMarks'];
                    this.passMarks = resources[0]['subjectPassMarks'];
                    this.department = resources[0]['department'];
                    this.registrationNumber = resources[0]['registration_num'];
                    this.userName = resources[0]['name'].toUpperCase();
                    this.academicYear = "1st year";
                    this.semester = resources[0]['semester'];
                    this.dated = new Date()
                })
            }

            if(this.passMarks > this.score) {
                this.result = SD.failed.toUpperCase();
            }else {
                this.result = SD.passed.toUpperCase();
            }

            if(true === true ) {
                // this.examSubjectService.clearSessionStorage();
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