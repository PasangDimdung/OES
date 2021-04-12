import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Subjects } from "../_models/subject";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class SubjectService {
  baseUrl = environment.apiUrl + "subject/";

  constructor(private http: HttpClient) {}

  submit(model: Subjects) {
    return this.http.post(this.baseUrl, model);
  }

  getAll() {
    return this.http.get<Subjects[]>(this.baseUrl);
  }

  getUser(id: number): Observable<Subjects> {
    return this.http.get<Subjects>(this.baseUrl + id);
  }

  update(model: Subjects) {
    return this.http.put(this.baseUrl + model.id, model);
  }

  deleteList(id: number) {
    return this.http.delete(this.baseUrl + id);
  }
}
