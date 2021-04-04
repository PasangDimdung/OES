import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { ExamName } from "../_models/exam-name";

@Injectable({
  providedIn: "root",
})
export class ExamNameService {
  baseUrl = environment.apiUrl + "exam/";

  constructor(private http: HttpClient) {}

  submit(model: ExamName) {
    return this.http.post(this.baseUrl, model);
  }

  getAll() {
    return this.http.get<ExamName[]>(this.baseUrl);
  }

  getUser(id: number): Observable<ExamName> {
    return this.http.get<ExamName>(this.baseUrl + id);
  }

  update(model: ExamName) {
    return this.http.put(this.baseUrl + model.id, model, {
      responseType: "text",
    });
  }

  deleteList(id: number) {
    return this.http.delete(this.baseUrl + id, { responseType: "text" });
  }
}
