import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Semester } from "../_models/semester";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class SemesterService {
  baseUrl = environment.apiUrl + "semester/";

  constructor(private http: HttpClient) {}

  submit(model: Semester) {
    return this.http.post(this.baseUrl, model);
  }

  getAll(): Observable<Semester[]> {
    return this.http.get<Semester[]>(this.baseUrl);
  }

  getUser(id: number): Observable<Semester> {
    return this.http.get<Semester>(this.baseUrl + id);
  }

  update(model: Semester) {
    return this.http.put(this.baseUrl + model.id, model, {
      responseType: "text",
    });
  }

  deleteList(id: number) {
    return this.http.delete(this.baseUrl + id);
  }
}
