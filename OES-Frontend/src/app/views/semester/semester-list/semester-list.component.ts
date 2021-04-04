import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SemesterService } from "../../../_services/semester.service";
import { Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import { Semester } from "../../../_models/semester";

@Component({
  selector: "app-semester-list",
  templateUrl: "semester-list.component.html",
})
export class SemesterListComponent implements OnInit {
  errorMessage: string = '';
  semesterList: any;

  isSubmitted: boolean = false;

  private _refresh$ = new Subject<void>();

  constructor(
    private semesterService: SemesterService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  get refresh$() {
    return this._refresh$;
  }

  ngOnInit() {
    this.loadSemester();
    this.refresh$.subscribe(() => {
      this.semesterService.getAll()
      .subscribe((response) => {
        let resources = response["data"];
        this.semesterList = resources;
      });
    });
  }

  loadSemester() {
    this.route.data.subscribe((response) => {
      let resources = response.semesterResolver["data"];
      this.semesterList = resources;
    });
  }

  trackById(index: number, trackSemester: Semester): number {
    return trackSemester.id;
  }

  onDelete(id: number) {
    this.isSubmitted = true;
    this.semesterService.deleteList(id)
    .pipe(
      tap(() => {
        this._refresh$.next();
      })
    )
    .subscribe(
      () => {
        this.isSubmitted = false;
        this.toastr.success("Semester deleted successfully");
      },
      (error) => {
        this.isSubmitted = false;
        this.errorMessage = error.error.message;
        this.toastr.error(this.errorMessage);
      }
    );
  }
}
