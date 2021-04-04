import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { QuestionTypeService } from "../_services/question-type.service";

@Injectable()
export class QuestionTypeResolver implements Resolve<any> {
  // tslint:disable-next-line: variable-name
  constructor(
    private router: Router,
    private questionTypeService: QuestionTypeService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.questionTypeService.getAll().pipe(
      catchError((error) => {
        this.router.navigate(["/dashboard"]);
        return of(null);
      })
    );
  }
}
