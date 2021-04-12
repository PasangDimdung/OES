import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { QuestionType } from "../../../_models/question-type";
import { AcademicYearService } from "../../../_services/academic-year.service";
import { QuestionTypeService } from "../../../_services/question-type.service";

@Component({
  selector: "app-academic-year-list",
  templateUrl: "academic-year-list.component.html",
})
export class AcademicYearListComponent implements OnInit {
  errorMessage: string = "";
  academicYearList: any;

  private _refresh$ = new Subject<void>();

  constructor(
    private academicYearService: AcademicYearService,
    private questionTypeService: QuestionTypeService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  get refresh$() {
    return this._refresh$;
  }

  ngOnInit() {
    this.loadAcademicYear();
    this._refresh$.subscribe(() => {
      this.academicYearService.getAll()
      .subscribe((response) => {
        console.log(response);
        let resources = response["data"];
        this.academicYearList = resources;
      });
    });
  }

  loadAcademicYear() {
   this.academicYearService.getAll()
   .subscribe((response) => {
      let resources = response["data"];
      this.academicYearList = resources;
    });
  }

  trackById(index: number, trackQuestionType: QuestionType): number {
    return trackQuestionType.id;
  }

  onDelete(id: number) {
    this.academicYearService.deleteList(id)
    .pipe(
      tap(() => {
        this._refresh$.next();
      })
    )
    .subscribe((response) => {
        this.toastr.success(response["message"]);
      },
      (error) => {
        this.errorMessage = error.error.message;
        this.toastr.error(this.errorMessage);
      }
    );
  }
}
