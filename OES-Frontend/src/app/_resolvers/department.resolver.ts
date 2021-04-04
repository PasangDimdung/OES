import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { DepartmentService } from "../_services/department.service";

@Injectable()
export class DepartmentResolver implements Resolve<any> {
  // tslint:disable-next-line: variable-name
  constructor(
    private router: Router,
    private departmentService: DepartmentService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.departmentService.getAll().pipe(
      catchError((error) => {
        this.router.navigate(["/dashboard"]);
        return of(null);
      })
    );
  }
}
