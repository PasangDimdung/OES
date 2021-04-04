import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Department } from "../../../_models/department";
import { ExamName } from "../../../_models/exam-name";
import { Semester } from "../../../_models/semester";
import { DepartmentService } from "../../../_services/department.service";
import { ExamNameService } from "../../../_services/exam-name.service";
import { SemesterService } from "../../../_services/semester.service";
import { SubjectFormGroup } from "../subject-form/subject-form.component";

export enum EditMode {
  Create = 0,
  Edit = 1,
}

@Component({
  templateUrl: "add-exam-name.component.html",
})
export class AddExamNameComponent {
  public date: Object = new Date();

  form: FormGroup;
  formGroup: FormGroup;

  errorMessage: string = '';
  examNameForm: ExamName = {} as ExamName;

  departments: Department[];
  semesters: Semester[];
  editMode: EditMode = EditMode.Create;
  subjectList: any = [];
  sDates: any;
  examNameID: number;

  isSubmitted: boolean = false;

  constructor(
    private examNameService: ExamNameService,
    private semesterService: SemesterService,
    private departmentService: DepartmentService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [this.examNameForm.id],
      name: [this.examNameForm.name, [Validators.required]],
      starting_date: ['', [Validators.required]],
      ending_date: ['', [Validators.required]],
      semester: [''],
      academic_year: [''],
      department: [''],
    });

    //Subject FormGroup
    this.formGroup = this.formBuilder.group({
      subjectDates: this.formBuilder.array([])
    })

    this.loadExamName();
    this.loadDepartment();
    this.loadSemester();
  }

  loadExamName() {
    if (this.route.snapshot.params.id) {
      this.editMode = EditMode.Edit;
      this.examNameService.getUser(this.route.snapshot.params.id)
      .subscribe((response) => {
        let resources = response["data"];
        this.examNameForm = resources;
        this.form.reset(this.examNameForm);
      });
    }
  }

  loadDepartment() {
    this.departmentService.getAll()
    .subscribe((response) => {
      let resources = response["data"];
      this.departments = resources;
    });
  }

  loadSemester() {
    this.semesterService.getAll()
    .subscribe((response) => {
      let resources = response["data"];
      this.semesters = resources;
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.value.id) {
      this.examNameService.update(this.form.value as ExamName)
      .subscribe(() => {
          this.goToExamNameList();
          this.form.reset();
          this.toastr.success("Exam Name updated successfully");
        },
        (error) => {
          this.errorMessage = error.error.message;
          this.toastr.error(this.errorMessage);
        }
      );
    } else {
      this.examNameService.submit(this.form.value as ExamName)
      .subscribe((response) => {
          let resources = response["data"];
          this.examNameID = resources['id'];
          this.sDates = resources["sDates"];

          //Get subjects
          for (let i = 0; i < this.sDates.length; i++) {
            this.subjectList.push(this.sDates[i]["subject"]);
          }

          //Populates the subject form and creates array of objects. 
          var subjectDates = this.subjectList;

          subjectDates.forEach(() => {
            (this.formGroup.get("subjectDates") as FormArray).controls.push(
              SubjectFormGroup(this.formBuilder)
            );
          });

          this.formGroup.patchValue({
            subjectDates
          });

          this.toastr.success("Exam Name added successfully");
        },
        (error) => {
          this.errorMessage = error.error.message;
          this.toastr.error(this.errorMessage);
        }
      );
    }
  }

  onSumitSubjectForm() {
    //Patching the raw values of subject form
    var subjectDates = this.subjectList;
    subjectDates.forEach(() => {
      (this.formGroup.get("subjectDates") as FormArray).controls
    });

    this.formGroup.patchValue({
      subjectDates
    });

    this.http.post( "http://localhost:8080/api/exam/" + this.examNameID + "/subjects/", this.formGroup.get('subjectDates').value)
    .subscribe(()=> {
      this.toastr.success("Subject Data and Time added successfully");
      this.goToExamNameList();
    })
  }

  onFormReset() {
    this.form.reset({
      academic_year: [''],
      department: [''],
      semester: [''],
    });
  }

  goToExamNameList() {
    return this.router.navigate(["/exam-name/list"]);
  }
}
