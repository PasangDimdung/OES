import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { QuestionType } from "../../../_models/question-type";
import { QuestionTypeService } from "../../../_services/question-type.service";

@Component({
  selector: "app-academic-year-list",
  templateUrl: "academic-year-list.component.html",
})
export class AcademicYearListComponent implements OnInit {
  errorMessage: string = "";
  questionTypeList: any;

  private _refresh$ = new Subject<void>();

  constructor(
    private questionTypeService: QuestionTypeService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  get refresh$() {
    return this._refresh$;
  }

  ngOnInit() {
    this.loadQuestionType();
    this._refresh$.subscribe(() => {
      this.questionTypeService.getAll().subscribe((response) => {
        let resources = response["data"];
        this.questionTypeList = resources;
      });
    });
  }

  loadQuestionType() {
    this.route.data.subscribe((response) => {
      let resources = response.questionTypeResolver["data"];
      this.questionTypeList = resources;
    });
  }

  trackById(index: number, trackQuestionType: QuestionType): number {
    return trackQuestionType.id;
  }

  onDelete(id: number) {
    this.questionTypeService.deleteList(id)
    .pipe(
      tap(() => {
        this._refresh$.next();
      })
    )
    .subscribe(() => {
        this.toastr.success("Question Type deleted successfully");
      },
      (error) => {
        this.errorMessage = error.error.message;
        this.toastr.error(this.errorMessage);
      }
    );
  }
}
