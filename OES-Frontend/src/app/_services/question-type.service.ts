import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { QuestionType } from "../_models/question-type";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class QuestionTypeService {
  baseUrl = environment.apiUrl + "questionType/";

  constructor(private http: HttpClient) {}

  submit(model: QuestionType) {
    return this.http.post(this.baseUrl, model);
  }

  getAll() {
    return this.http.get<QuestionType[]>(this.baseUrl);
  }

  getUser(id: number): Observable<QuestionType> {
    return this.http.get<QuestionType>(this.baseUrl + id);
  }

  update(model: QuestionType) {
    return this.http.put(this.baseUrl + model.id, model, {
      responseType: "text",
    });
  }

  deleteList(id: number) {
    return this.http.delete(this.baseUrl + id, { responseType: "text" });
  }
}
