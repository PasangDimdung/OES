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
import { SemesterService } from "../../../_services/semester.service";
import { SubjectService } from "../../../_services/subject.service";

@Component({
  templateUrl: "subject-list.component.html",
})
export class SubjectListComponent implements OnInit {
  errorMessage: string = "";
  subjectForm: Subjects = {} as Subjects;
  semesters: Semester[];
  subjectList: any;
  departments: Department[];

  selectedSemester = '';
  selectedDepartment = '';

  selectedDepartmentId: number;
  selectedSemesterId: number;

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
    private semesterService: SemesterService,
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  get refresh$() {
    return this._refresh$;
  }

  ngOnInit() {
    this.loadDepartment();
    // this.loadSemester();
    this.refresh$.subscribe(() => {
      this.http.get("http://localhost:8080/api/department/" + this.selectedDepartmentId + "/semester/" + this.selectedSemesterId + "/subjects/")
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

  trackById(index: number, trackSubject: Subjects): number {
    return trackSubject.id;
  }

  onDepartmentChange(id: number) {
    this.selectedDepartmentId = id;
    this.loadSemester();
  }

  onSemesterChange(id: number) {
    this.selectedSemesterId = id;
    this.http.get("http://localhost:8080/api/department/" + this.selectedDepartmentId + "/semester/" + id + "/subjects/")
    .pipe(
      tap(() => {
        this._refresh$.next();
      })
    )
    .subscribe(response => {
      console.log(response);
      this.selectedSemester = '';
      this.selectedDepartment = '';
      var resources = response["data"];  
      this.subjectList = resources;  
    })
  }

  onDelete(id: number) {
    this.http.delete("http://localhost:8080/api/semester/" + 1 + "/removeSubject/" + id)
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      )
      .subscribe(
        () => {
          this.toastr.success("Subject deleted for " + 1);
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
