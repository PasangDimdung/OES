import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { SignUp } from "../_models/signup-form";

const SUBJECT_ID = "subjectID";


@Injectable({
  providedIn: "root",
})
export class UserService {
  baseUrl = environment.apiUrl + "auth/signup/";
  studentDetailsUrl = environment.apiUrl + "student/";

  constructor(private http: HttpClient) {}

  submit(model: SignUp) {
    return this.http.post(this.baseUrl, model);
  }

  add(model) {
    return this.http.post(this.studentDetailsUrl, model);
  }

  public saveSubjectID(subjectID: string) {
    window.sessionStorage.removeItem(SUBJECT_ID);
    window.sessionStorage.setItem(SUBJECT_ID, subjectID);
  }

  public getSubjectId(): string {
    return sessionStorage.getItem(SUBJECT_ID);
  }
}
