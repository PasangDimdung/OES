import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { Department } from "../../../_models/department";
import { Semester } from "../../../_models/semester";
import { Subjects } from "../../../_models/subject";
import { DepartmentService } from "../../../_services/department.service";
import { SubjectService } from "../../../_services/subject.service";

@Component({
  templateUrl: "subject-list.component.html",
})
export class SubjectListComponent implements OnInit {
  errorMessage: string = "";
  subjectForm: Subjects = {} as Subjects;
  semester: Semester = {} as Semester;
  subjectList: any;
  departments: Department[];

  form = new FormGroup({
    name: new FormControl(this.subjectForm.name, [Validators.required]),
    fullMarks: new FormControl(this.subjectForm.fullMarks, [Validators.required]),
    passMarks: new FormControl(this.subjectForm.passMarks, [Validators.required]),
    duration: new FormControl(this.subjectForm.duration, [Validators.required]),
    department: new FormControl('', [Validators.required]),
  });

  private _refresh$ = new Subject<void>();

  constructor(
    private departmentService: DepartmentService,
    private subjectService: SubjectService,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  get refresh$() {
    return this._refresh$;
  }

  ngOnInit() {
    this.loadDepartment();
    // this.loadSemester();
    this.loadSubject();
    // this.refresh$.subscribe(() => {
    //   if (this.route.snapshot.params.id) {
    //     this.semesterService
    //       .getUser(this.route.snapshot.params.id)
    //       .subscribe((response) => {
    //         let resources = response["data"];
    //         this.semester = resources;
    //         this.subjectList = this.semester["subjects"];
    //       });
    //   }
    // });
  }

  loadDepartment() {
    this.departmentService.getAll()
    .subscribe((response) => {
      let resources = response["data"];
      this.departments = resources;
    });
  }

  // loadSemester() {
  //   if (this.route.snapshot.params.id) {
  //     this.semesterService
  //       .getUser(this.route.snapshot.params.id)
  //       .subscribe((response) => {
  //         let resources = response["data"];
  //         this.semester = resources;
  //       });
  //   }
  // }

  loadSubject() {
    this.subjectService.getAll()
    .subscribe((response) => {
      let resources = response["data"];
      this.subjectList = resources;
    });
  }

  trackById(index: number, trackSubject: Subjects): number {
    return trackSubject.id;
  }

  onDelete(id: number) {
    this.http.delete("http://localhost:8080/api/semester/" + this.semester.id + "/removeSubject/" + id)
    .pipe(
      tap(() => {
        this._refresh$.next();
      })
    )
    .subscribe(
      () => {
        this.toastr.success("Subject deleted for " + this.semester.name);
      },
      (error) => {
        this.errorMessage = error.error.message;
        this.toastr.error(this.errorMessage);
      }
    );
  }

  onFormReset() {
    this.form.reset();
  }
}
