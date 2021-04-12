import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

const EXAM_ID = "examId";
const SEMESTER = "semester";
const DEPARTMENT = "department";
const SUBJECT = "subject";
const EXAMSUBJECTID = 'exam_subject_id';

@Injectable({
  providedIn: "root",
})
export class ExamSubjectService {
  
  clearSessionStorage() {
    window.sessionStorage.removeItem(EXAM_ID);
    window.sessionStorage.removeItem(DEPARTMENT);
    window.sessionStorage.removeItem(SEMESTER);
    window.sessionStorage.removeItem(SUBJECT);
    window.sessionStorage.removeItem(EXAMSUBJECTID);
  }

  public saveExamSubjectID(examSubjectID: string) {
    window.sessionStorage.removeItem(EXAMSUBJECTID);
    window.sessionStorage.setItem(EXAMSUBJECTID, examSubjectID);
  }

  public getExamSubjectID(): string {
    return sessionStorage.getItem(EXAMSUBJECTID);
  }

  public saveExamID(examID: string) {
    window.sessionStorage.removeItem(EXAM_ID);
    window.sessionStorage.setItem(EXAM_ID, examID);
  }

  public getExamId(): string {
    return sessionStorage.getItem(EXAM_ID);
  }

  public saveDepartment(department: string) {
    window.sessionStorage.removeItem(DEPARTMENT);
    window.sessionStorage.setItem(DEPARTMENT, department);
  }

  public getDepartment(): string {
    return sessionStorage.getItem(DEPARTMENT);
  }

  public saveSemester(semester: string) {
    window.sessionStorage.removeItem(SEMESTER);
    window.sessionStorage.setItem(SEMESTER, semester);
  }

  public getSemester(): string {
    return sessionStorage.getItem(SEMESTER);
  }

  public saveSubject(subject: string) {
    window.sessionStorage.removeItem(SUBJECT);
    window.sessionStorage.setItem(SUBJECT, subject);
  }

  public getSubject(): string {
    return sessionStorage.getItem(SUBJECT);
  }
}
