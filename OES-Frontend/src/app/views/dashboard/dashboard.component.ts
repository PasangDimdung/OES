import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { TokenStorageService } from "../../_auth/token-storage.service";
import { ExamNameService } from "../../_services/exam-name.service";

@Component({
  templateUrl: "dashboard.component.html",
})
export class DashboardComponent implements OnInit {
  private roles: string[];
  public authority: string;

  errorMessage = "";
  adminExamNameList: any = [];
  studentExamNameList: any = [];

  enroll: boolean = false;

  private _refresh$ = new Subject<void>();

  constructor(
    private tokenStorageService: TokenStorageService,
    private examNameService: ExamNameService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) {}

  get refresh$() {
    return this._refresh$;
  }

  ngOnInit() {
    if (this.tokenStorageService.getToken()) {
      this.roles = this.tokenStorageService.getAuthorities();
      this.roles.every((role) => {
        if (role === "ROLE_ADMIN") {
          this.authority = "admin";
          return false;
        } else if (role === "ROLE_PM") {
          this.authority = "pm";
          return false;
        }
        this.authority = "user";
        return true;
      });
    }

    this.loadAdminExamName();
    if(this.authority == "user")
    {
      this.loadStudentExamName();
    }
    this._refresh$.subscribe(() => {
      this.examNameService.getAll().subscribe((response) => {
        let resources = response["data"];
        this.studentExamNameList = resources;
      });
    });
  }

  loadAdminExamName() {
    this.examNameService.getAll().subscribe((response) => {
      let resources = response["data"];
      this.adminExamNameList = resources;
    });
  }

  loadStudentExamName() {
    this.http.get("http://localhost:8080/api/user/" + this.tokenStorageService.getUserId() + "/exams/")
      .subscribe((response) => {
        let resources = response["data"];
        this.studentExamNameList = resources;
      });
  }

  onDelete(id: number) {
    this.examNameService
      .deleteList(id)
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      )
      .subscribe(
        () => {
          this.toastr.success("Exam Name deleted successfully");
        },
        (error) => {
          this.errorMessage = error.error.message;
          this.toastr.error(this.errorMessage);
        }
      );
  }

  toggleEnroll(): void {
    this.enroll = !this.enroll;
  }
}
