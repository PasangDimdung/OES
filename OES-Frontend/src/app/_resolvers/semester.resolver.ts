import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { SemesterService } from "../_services/semester.service";

@Injectable()
export class SemesterResolver implements Resolve<any> {
  // tslint:disable-next-line: variable-name
  constructor(
    private router: Router,
    private semesterService: SemesterService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.semesterService.getAll().pipe(
      catchError((error) => {
        this.router.navigate(["/dashboard"]);
        return of(null);
      })
    );
  }
}
