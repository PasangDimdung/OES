import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class QuestionPaperService {
  baseUrl = environment.apiUrl + "generatePaper/";

  constructor(private http: HttpClient) {}

  submit(model: any) {
    return this.http.post(this.baseUrl, model);
  }
}
