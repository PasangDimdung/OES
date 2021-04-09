import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { TokenStorageService } from "../../../_auth/token-storage.service";
import { ExamSubjectService } from "../../../_services/exam-subject.service";
import { UserService } from "../../../_services/user.service";

@Component({
    templateUrl:"exam-result.component.html"
})
export class ExamResult implements OnInit{

    errorMessage: string = '';
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
    score: any;

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
        .subscribe(response => {
            this.score = response['data'];
            console.log(response);
            if(response['status'] === true ) {
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