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

  todayDate = new Date();
  examSubjectDuration: any;
  myTime: any;
  examSubjectName: any;

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
    this.currentDateTime = formatDate(new Date(), 'MM/dd/yyyy', 'en');
  }, 1000);

  canDeactivate() {
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
      subject: this.examSubjectService.getSubject(),
      exam: { id: this.examSubjectService.getExamId() }
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
        if (response['status'] === true) {
          let resources = response['data'];
          this.examSubjectName = resources['subject'];
          this.questionDetails = resources;
          this.questions = resources['questions'];
          this.questionLength = resources['questions'];
          this.subjectID = this.questions[0]['subjectUnit'].subject.id;
          this.myTime = Number(resources['questions'][0]['subjectUnit']["subject"].duration) * 60;
          this.form.reset({
            year: this.today,
            examName: '',
            department: '',
            semester: '',
            subject: '',
          })
          this.getCheckedRadioBtnValue(this.questionProgress);
        } else {
          this.toastr.error(response['message']);
        }
      }, (error) => {
        this.errorMessage = error.error.message;
        this.toastr.error(this.errorMessage);
      })
  }

  getCheckedRadioBtnValue(progress) {
    if (window.sessionStorage.getItem(progress)) {
      this.checkedRadioBtnValue = window.sessionStorage.getItem(progress).toString();
    }
  }

  patchAnswer() {
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
        id: this.questionLength[progress].id
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
        id: this.questionLength[progress].id
      },
      choice: {
        id: ""
      },
      subject: {
        id: this.subjectID
      }
    })
  }

  patchAnswerWithSessionChoice(progress) {
    this.answerForm.patchValue({
      choice: {
        id: Number(window.sessionStorage.getItem((progress + 256).toString()))
      },
      question: {
        id: this.questionLength[progress].id
      },
      subject: {
        id: this.subjectID
      }
    })
  }

  onOptionClick(questionID: any, choiceID: any, choiceName: any) {
    this.selectedQuestion = questionID;
    this.selectedAnswer = choiceID;

    this.patchAnswer();

    // console.log("ON OPTION CLICK", this.answerForm.value)

    //Sets value to the session - {0,"choice1"}
    window.sessionStorage.setItem(this.questionProgress, choiceName);
    window.sessionStorage.setItem(this.questionProgress + 256, choiceID);
  }

  onStep(selectedStep: any) {
    this.questionProgress = Number(selectedStep);
    this.getCheckedRadioBtnValue(this.questionProgress);
  }

  onPostAnswer(answer) {
    this.http.post("http://localhost:8080/api/exam/subject/answer", answer)
      .subscribe(() => {
        this.userService.saveSubjectID(this.subjectID);
      })
  }

  onNext() {
    //if choice isn't selected and next button is clicked. Patch empty string to the choice id 
    if (window.sessionStorage.getItem((this.questionProgress + 256))) {
      this.patchAnswerWithSessionChoice(this.questionProgress);
      console.log("if--", this.answerForm.value);
      this.onPostAnswer(this.answerForm.value)
      this.questionProgress++;
      this.getCheckedRadioBtnValue(this.questionProgress);
    }
    else if (this.selectedAnswer == null) {
      this.patchAnswerWithEmptyChoice(this.questionProgress);
      console.log("elseif--", this.answerForm.value);
      this.onPostAnswer(this.answerForm.value)
      this.questionProgress++;
      this.getCheckedRadioBtnValue(this.questionProgress);
    }
    else {
      this.patchAnswerWithSelectedChoice(this.questionProgress);
      console.log("else--", this.answerForm.value);
      this.onPostAnswer(this.answerForm.value)
      this.questionProgress++;
      this.getCheckedRadioBtnValue(this.questionProgress);
    }
  }

  onPrev() {
    //if choice isn't selected and next button is clicked. Patch empty string to the choice id 
    if (window.sessionStorage.getItem((this.questionProgress + 256))) {
      this.patchAnswerWithSessionChoice(this.questionProgress);
      this.onPostAnswer(this.answerForm.value)
      this.questionProgress--;
      this.getCheckedRadioBtnValue(this.questionProgress);
    }
    else if (this.selectedAnswer == null) {
      this.patchAnswerWithEmptyChoice(this.questionProgress);
      this.onPostAnswer(this.answerForm.value)
      this.questionProgress--;
      this.getCheckedRadioBtnValue(this.questionProgress);
    }
    else {
      this.patchAnswerWithSelectedChoice(this.questionProgress);
      this.onPostAnswer(this.answerForm.value)
      this.questionProgress--;
      this.getCheckedRadioBtnValue(this.questionProgress);
    }
  }

  onSubmit() {
    //if choice isn't selected and next button is clicked. Patch empty string to the choice id 
    if (window.sessionStorage.getItem((this.questionProgress + 256))) {
      this.patchAnswerWithSessionChoice(this.questionProgress);
      console.log("--submit")
      console.log(this.answerForm.value);
      this.onPostAnswer(this.answerForm.value)
    }
    else if (this.selectedAnswer == null) {
      this.patchAnswerWithEmptyChoice(this.questionProgress);
      this.onPostAnswer(this.answerForm.value)
    }
    else {
      this.patchAnswerWithSelectedChoice(this.questionProgress);
      this.onPostAnswer(this.answerForm.value)
    }

    console.log('status form', this.statusForm.value)
    this.http.put("http://localhost:8080/api/exam-subject/" + this.examSubjectService.getExamSubjectID() + '/status', this.statusForm.value)
    .subscribe(res =>{
      console.log(res);
      console.log("hitted")
    })

    this.isSubmitted = true;
    clearInterval(this.myInterval);
    this.router.navigate(['dashboard/exam-result']);
    this.questionAnsArray.push(this.answerForm.value);
  }

  myInterval = setInterval(() => {
    if (this.myTime > 0) {
      this.myTime = this.myTime - 1;
    } else {
      clearInterval(this.myInterval);
      var progress = 0;
      console.log('my interval', progress);
      for (let index = 0; index < this.questionLength.length; index++) {
        if (window.sessionStorage.getItem((progress + 256).toString())) {
          this.patchAnswerWithSessionChoice(progress);
          console.log(this.answerForm.value);
          this.onPostAnswer(this.answerForm.value)
          progress++;
          this.getCheckedRadioBtnValue(progress);
        }
        else if (this.selectedAnswer == null) {
          this.patchAnswerWithEmptyChoice(progress);
          console.log("elseif--", this.answerForm.value);
          this.onPostAnswer(this.answerForm.value)
          progress++;
          this.getCheckedRadioBtnValue(progress);
        }
        else {
          this.patchAnswerWithSelectedChoice(progress);
          console.log("else--", this.answerForm.value);
          this.onPostAnswer(this.answerForm.value)
          progress++;
          this.getCheckedRadioBtnValue(progress);
        }
      }
      this.isSubmitted = true;
      this.router.navigate(['dashboard/exam-result']);
    }
  }, 1000);

}

