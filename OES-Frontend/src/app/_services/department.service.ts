import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Department } from "../_models/department";

@Injectable({
  providedIn: "root",
})
export class DepartmentService {
  baseUrl = environment.apiUrl + "department/";

  constructor(private http: HttpClient) {}

  submit(model: Department) {
    return this.http.post(this.baseUrl, model);
  }

  getAll(): Observable<Department[]> {
    return this.http.get<Department[]>(this.baseUrl);
  }

  getUser(id: number): Observable<Department> {
    return this.http.get<Department>(this.baseUrl + id);
  }

  update(model: Department) {
    return this.http.put(this.baseUrl + model.id, model);
  }

  deleteList(id: number) {
    return this.http.delete(this.baseUrl + id);
  }
}
