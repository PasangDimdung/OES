import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { ExamName } from "../../../_models/exam-name";
import { ExamNameService } from "../../../_services/exam-name.service";

@Component({
  templateUrl: "exam-name-list.component.html",
})
export class ExamNameListComponent {
  errorMessage: string = '';
  examNameList: any;

  isSubmitted: boolean = false;

  private _refresh$ = new Subject<void>();

  constructor(
    private examNameService: ExamNameService,
    private route: ActivatedRoute,
    private toastr: ToastrService,

  ) {}

  get refresh$() {
    return this._refresh$;
  }

  ngOnInit() {
    this.loadExamName();
    this._refresh$.subscribe(() => {
      this.examNameService.getAll().subscribe((response) => {
        let resources = response["data"];
        this.examNameList = resources;
      });
    });
  }

  loadExamName() {
    this.route.data.subscribe((response) => {
      let resources = response.examNameResolver["data"];
      this.examNameList = resources;
    });
  }

  trackById(index: number, trackExamName: ExamName): number {
    return trackExamName.id;
  }

  onDelete(id: number) {
    this.isSubmitted = true;
    this.examNameService.deleteList(id)
    .pipe(
      tap(() => {
        this._refresh$.next();
      })
    )
    .subscribe(() => {
      this.isSubmitted = false;
        this.toastr.success("Exam Name deleted successfully");
      },
      (error) => {
        this.isSubmitted = false;
        this.errorMessage = error.error.message;
        this.toastr.error(this.errorMessage);
      }
    );
  }
}
