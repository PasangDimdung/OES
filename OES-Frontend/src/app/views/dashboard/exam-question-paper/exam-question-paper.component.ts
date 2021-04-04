import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExamSubjectService } from '../../../_services/exam-subject.service';

@Component({
    templateUrl: 'exam-question-paper.component.html'
})

export class ExamQuestionPaperComponent {
    @ViewChild("f") public examForm: NgForm
    errorMessage: string = '';
    form: FormGroup;
    today: number;

    isSubmitted: boolean = false;

    departments: any;
    semesters: any;
    subjects: any;
    examNames: any;
    questionPaperList: any;
    questionDetails: any;
    questionMarks: any;

    constructor(private examSubjectService: ExamSubjectService,
        private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private http: HttpClient
    ) {}

    ngOnInit() {
        let date: Date = new Date();
        this.today = date.getFullYear();

        this.form = this.formBuilder.group({
            semester: this.examSubjectService.getSemester(),
            department: this.examSubjectService.getDepartment(),
            year: this.today,
            subject: this.examSubjectService.getSubject()
        })
        this.http.post("http://localhost:8080/api/exam/" + this.examSubjectService.getExamId() + '/subject' + '/questions', this.form.value)
            .subscribe(response => {
                this.isSubmitted = false;
                if (response['status'] === true) {
                    // this.examSubjectService.clearSessionStorage();
                    let resources = response['data'];
                    this.questionDetails = resources;
                    this.questionPaperList = resources['questions'];
                    console.log(this.questionPaperList)
                    this.questionMarks = this.questionPaperList[0]['subjectUnit'];
                    this.form.reset({
                        year: this.today,
                        examName: '',
                        department: '',
                        semester: '',
                        subject: '',
                    })
                } else {
                    this.toastr.error(response['message']);
                }
            }, (error) => {
                this.isSubmitted = false;
                this.errorMessage = error.error.message;
                this.toastr.error(this.errorMessage);
            })
    }
}

