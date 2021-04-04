import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { ExamNameService } from "../_services/exam-name.service";

@Injectable()
export class ExamNameResolver implements Resolve<any> {
  // tslint:disable-next-line: variable-name
  constructor(
    private router: Router,
    private examNameService: ExamNameService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.examNameService.getAll().pipe(
      catchError((error) => {
        this.router.navigate(["/dashboard"]);
        return of(null);
      })
    );
  }
}
