import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AcademicYearService {
  baseUrl = environment.apiUrl + "academic-year/";

  constructor(private http: HttpClient) {}

  submit(model: any) {
    return this.http.post(this.baseUrl, model);
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getUser(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + id);
  }

  update(model: any) {
    return this.http.put(this.baseUrl + model.id, model);
  }

  deleteList(id: number) {
    return this.http.delete(this.baseUrl + id);
  }
}
