import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ForgetPasswordService {
  private baseUrl = environment.apiUrl + "auth/forgot_password";
  private resetUrl = environment.apiUrl + "auth/reset_password";
  private resetOldPasswordUrl = environment.apiUrl + "change_password";
  constructor(private http: HttpClient) {}

  submit(model) {
    return this.http.post(this.baseUrl, model);
  }

  reset(model) {
    return this.http.post(this.resetUrl, model);
  }

  resetOldPassword(model){
    return this.http.post(this.resetOldPasswordUrl, model);
  }
}
