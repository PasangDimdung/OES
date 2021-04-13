import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AcademicYear } from "../../../_models/academic-year";
import { Department } from "../../../_models/department";
import { Semester } from "../../../_models/semester";
import { Subjects } from "../../../_models/subject";
import { AcademicYearService } from "../../../_services/academic-year.service";
import { DepartmentService } from "../../../_services/department.service";
import { SemesterService } from "../../../_services/semester.service";
import { SubjectService } from "../../../_services/subject.service";

export enum EditMode {
  Create = 0,
  Edit = 1,
}

@Component({
  selector: "app-add-subject",
  templateUrl: "add-subject.component.html",
})
export class AddSubjectComponent implements OnInit {
  errorMessage: string = '';
  subjectForm: Subjects = {} as Subjects;
  semesters: Semester[];
  subjectList: any;
  departments: Department[];
  academicyears: AcademicYear[];

  form = new FormGroup({
    name: new FormControl(this.subjectForm.name, [Validators.required]),
    fullMarks: new FormControl(this.subjectForm.fullMarks, [Validators.required]),
    passMarks: new FormControl(this.subjectForm.passMarks, [Validators.required]),
    duration: new FormControl(this.subjectForm.duration, [Validators.required]),
    department: new FormGroup({
      id: new FormControl('',[Validators.required])
    }),
    semester: new FormGroup({
      id: new FormControl('',[Validators.required])
    }),   
  });

  constructor(
    private departmentService: DepartmentService,
    private academicYearService: AcademicYearService,
    private semesterService: SemesterService,
    private subjectService: SubjectService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadDepartment();
  }

  loadDepartment() {
    this.departmentService.getAll()
    .subscribe((response) => {
      let resources = response["data"];
      this.departments = resources;
    });
  }

  loadAcademicYear() {
    this.academicYearService.getAll()
        .subscribe((response) => {
            let resources = response["data"];
            this.academicyears = resources;
        });
}

  loadSemester() {
    this.semesterService.getAll()
    .subscribe((response) => {
      let resources = response["data"];
      this.semesters = resources;
    });
  }

  onDepartmentChange() {
    this.loadAcademicYear();
  }

  onAcademicYearChange() {
    this.loadSemester();
  }


  onSubmit() {
   this.subjectService.submit(this.form.value)
   .subscribe(
    (response) => {
      this.onFormReset();
      this.toastr.success(response['message']);
    },
    (error) => {
      this.errorMessage = error.error.message;
      this.toastr.error(this.errorMessage);
    });
  }

  onFormReset() {
    this.form.reset({
      department: {
        id: [''],
      },
      semester: {
        id:['']
      }
    });
  }
}
