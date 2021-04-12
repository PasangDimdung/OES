import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { Department } from "../../../_models/department";
import { Subjects } from "../../../_models/subject";
import { Unit } from "../../../_models/unit";
import { SubjectService } from "../../../_services/subject.service";

@Component({
  selector: "app-add-unit",
  templateUrl: "add-unit.component.html",
})
export class AddUnitComponent implements OnInit {
  unitList: any;
  selectedRow: any;
  departmentNameList: any;
  subject: Subjects = {} as Subjects;
  selectedDepartment: string;
  departmentList: Department[] = [];
  semesterList: any;

  form = new FormGroup({
    unit: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
  });

  private _refresh$ = new Subject<void>();
  errorMessage: any;

  constructor(
    private subjectService: SubjectService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadSubject();
    this.refresh$.subscribe(() => {
      if (this.route.snapshot.params.id) {
        this.subjectService
          .getUser(this.route.snapshot.params.id)
          .subscribe((response) => {
            let resources = response["data"];
            this.subject = resources;
            this.unitList = this.subject["units"];
          });
      }
    });
  }

  get refresh$() {
    return this._refresh$;
  }

  loadSubject() {
    if (this.route.snapshot.params.id) {
      this.subjectService.getUser(this.route.snapshot.params.id)
      .subscribe((response) => {
        let resources = response["data"];
        this.subject = resources;
        this.unitList = this.subject["units"];
      });
    }
  }

  trackById(index: number, trackUnit: Unit): number {
    return trackUnit.id;
  }

  onSubmit() {
    this.http.post("http://localhost:8080/api/subject/" + this.subject.id + "/addUnit/", this.form.value as Unit)
    .pipe(
      tap(() => {
        this._refresh$.next();
      })
    )
    .subscribe((response) => {
      this.form.reset({
        unit: "",
      });
      this.toastr.success(response['message']);
    });
  }

  onDelete(id: number) {
    this.http.delete("http://localhost:8080/api/subject/" + this.subject.id + "/deleteUnit/" + id)
    .pipe(
      tap(() => {
        this._refresh$.next();
      })
    )
    .subscribe(
      (response) => {
        this.toastr.success(response['message']);
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
