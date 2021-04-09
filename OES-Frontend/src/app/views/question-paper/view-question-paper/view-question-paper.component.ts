import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from '../../../_services/department.service';
import { ExamNameService } from '../../../_services/exam-name.service';
import { SemesterService } from '../../../_services/semester.service';
import { SubjectService } from '../../../_services/subject.service';

@Component({
    templateUrl: 'view-question-paper.component.html'
})

export class ViewQuestionPaperComponent {
    errorMessage: string = '';
    form: FormGroup;
    today: number;
    examNameID: any;

    isSubmitted: boolean = false;

    departments: any;
    semesters: any;
    subjects: any;
    examNames: any;
    questionPaperList: any;
    questionDetails: any;
    questionMarks: any;

    constructor(
        private examNameService: ExamNameService,
        private departmentService: DepartmentService,
        private semesterService: SemesterService,
        private subjectService: SubjectService,
        private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private http: HttpClient
    ) { }
    ngOnInit() {
        let date: Date = new Date();
        this.today = date.getFullYear();

        this.form = this.formBuilder.group({
            year: [this.today],
            department: [''],
            semester: [''],
            subject: [''],
            exam: {id: 1}
        });

        this.loadExamName()
        this.loadDepartment();
        this.loadSemester();
        this.loadSubject();
    }

    onExamNameChange(examNameID) {
        this.examNameID = examNameID;
    }

    loadExamName() {
        this.examNameService.getAll()
            .subscribe((response) => {
                let resources = response["data"];
                this.examNames = resources;
            });
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

    loadSubject() {
        this.subjectService.getAll()
            .subscribe((response) => {
                let resources = response["data"];
                this.subjects = resources;
            });
    }

    onSubmit() {
        this.isSubmitted = true;
        console.log(this.form.value);
        this.http.post("http://localhost:8080/api/exam/" + 1 + '/subject' + '/questions', this.form.value)
            .subscribe(response => {
                console.log(response);
                this.isSubmitted = false;
                if (response['status'] === true) {
                    let resources = response['data'];
                    this.questionDetails = resources;
                    this.questionPaperList = resources['questions']
                    this.questionMarks = this.questionPaperList[0]['subjectUnit'];
                    this.toastr.success(response['message']);
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

