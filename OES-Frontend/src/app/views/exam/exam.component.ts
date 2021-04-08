import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CanDeactivateGuard } from '../../_auth/can-deactivate';
import { TokenStorageService } from '../../_auth/token-storage.service';
import { Question } from '../../_models/questions';
import { SD } from '../../_sd';
import { ExamSubjectService } from '../../_services/exam-subject.service';
import { UserService } from '../../_services/user.service';

@Component({
  templateUrl: 'exam.component.html'
})

export class ExamComponent implements CanDeactivateGuard {
  errorMessage: string = '';
  isSubmitted: boolean;

  //Forms
  answerForm: FormGroup;
  form: FormGroup;
  statusForm: FormGroup;

  //Quesiton and answer array
  questionAnsArray = [];

  //Properties to hold question details value
  questionDetails: any;
  questionMarks: any;

  //Properties required to hit api and get questions
  departments: any;
  semesters: any;
  subjects: any;
  today: number;

  //Properties for displaying questions and progress
  questions: Question;
  questionProgress: any;
  questionLength = [];

  //Storing selected answer and question
  selectedQuestion: any;
  selectedAnswer: any;
  subjectID: any;
  currentDateTime: string;

  //Default selected radio buttion when you step, next or previous.
  checkedRadioBtnValue;

  constructor(
    private examSubjectService: ExamSubjectService,
    private tokenService: TokenStorageService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) { }

  //timer
  timeout = setInterval(() => {
    this.currentDateTime = formatDate(new Date(), 'yyyy-MM-ddTHH:mm:ss', 'en');
  }, 1000);

  canDeactivate() {
    console.log(this.isSubmitted);
    if (this.isSubmitted) {
      return true
    } else {
      return confirm("Are you sure you want to exit? All progress will be lost and you willl not be able to receive a report");
    }
  }

  ngOnInit() {
    this.questionProgress = 0;

    let date: Date = new Date();
    this.today = date.getFullYear();

    this.form = this.formBuilder.group({
      semester: this.examSubjectService.getSemester(),
      department: this.examSubjectService.getDepartment(),
      year: this.today,
      subject: this.examSubjectService.getSubject()
    })

    this.statusForm = this.formBuilder.group({
      status: SD.completed
    });

    this.answerForm = this.formBuilder.group({
      exam: {
        id: this.examSubjectService.getExamId()
      },
      question: {
        id: ''
      },
      choice: {
        id: ''
      },
      student: {
        id: this.tokenService.getUserId()
      },
      subject: {
        id: ''
      }
    })

    this.http.post("http://localhost:8080/api/exam/" + this.examSubjectService.getExamId() + '/subject' + '/questions', this.form.value)
      .subscribe(response => {
        console.log(response);
        if (response['status'] === true) {
          let resources = response['data'];
          this.questionDetails = resources;
          this.questions = resources['questions'];
          this.questionLength = resources['questions'];
          this.subjectID = this.questions[0]['subjectUnit'].subject.id;
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
        this.errorMessage = error.error.message;
        this.toastr.error(this.errorMessage);
      })

    this.getCheckedRadioBtnValue();

  }

  getCheckedRadioBtnValue() {
    //checks the session if there is any selected radio btn value.
    if (window.sessionStorage.getItem(this.questionProgress)) {
      //if there is any it sets to the checkedRadioBtnValue
      this.checkedRadioBtnValue = window.sessionStorage.getItem(this.questionProgress).toString();
    }
  }

  patchAnswer() {
    //Update value to the form after getting selected values
    this.answerForm.patchValue({
      question: {
        id: this.selectedQuestion
      },
      choice: {
        id: this.selectedAnswer
      },
      subject: {
        id: this.subjectID
      }
    })
  }

  patchAnswerWithSelectedChoice(progress) {
    this.answerForm.patchValue({
      question: {
        id: this.questions[progress].id
      },
      choice: {
        id: this.selectedAnswer
      },
      subject: {
        id: this.subjectID
      }
    })
  }

  patchAnswerWithEmptyChoice(progress) {
    this.answerForm.patchValue({
      question: {
        id: this.questions[progress].id
      },
      choice: {
        id: ""
      },
      subject: {
        id: this.subjectID
      }
    })
  }

  onOptionClick(questionID: any, choiceID: any, choiceName: any) {

    //To store selected question and answer
    this.selectedQuestion = questionID;
    this.selectedAnswer = choiceID;

    this.patchAnswer();

    console.log("ON OPTION CLICK", this.answerForm.value)

    //Sets value to the session - {0,"choice1"}
    window.sessionStorage.setItem(this.questionProgress, choiceName);
  }

  onStep(selectedStep: any) {

    this.questionProgress = Number(selectedStep);
    this.getCheckedRadioBtnValue();
  }

  onNext() {
    //if choice isn't selected and next button is clicked. Patch empty string to the choice id 
    if (this.selectedAnswer == null) {
      this.patchAnswerWithEmptyChoice(this.questionProgress);
    } else {
      this.patchAnswerWithSelectedChoice(this.questionProgress);
    }

    this.questionProgress++;
    this.getCheckedRadioBtnValue();

    this.http.post("http://localhost:8080/api/exam/subject/answer", this.answerForm.value)
      .subscribe(() => {
        this.userService.saveSubjectID(this.subjectID);
      })

    console.log("ON NEXT", this.answerForm.value);
  }

  onPrev() {
    //if choice isn't selected and prev button is clicked. Patch empty string to the choice id 
    if (this.selectedAnswer == null) {
      this.patchAnswerWithEmptyChoice(this.questionProgress);
    } else {
      this.patchAnswerWithSelectedChoice(this.questionProgress);
    }
    this.questionProgress--;
    this.getCheckedRadioBtnValue();

    this.http.post("http://localhost:8080/api/exam/subject/answer", this.answerForm.value)
      .subscribe(() => {
        this.userService.saveSubjectID(this.subjectID);
      })

    console.log("ON PREV", this.answerForm.value);
  }

  onSubmit() {
    console.log(this.answerForm.value);

    this.http.post("http://localhost:8080/api/exam/subject/answer", this.answerForm.value)
      .subscribe(() => {
        this.userService.saveSubjectID(this.subjectID);
      })

    this.http.put("http://localhost:8080/api/exam-subject/3/status", this.statusForm.value)
    .subscribe(res =>{
      console.log(res);
    })

    this.isSubmitted = true;
    this.router.navigate(['dashboard/exam-result']);
    this.questionAnsArray.push(this.answerForm.value);
  }
}

