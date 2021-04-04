import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Department } from "../../_models/department";
import { Semester } from "../../_models/semester";
import { SignUp } from "../../_models/signup-form";
import { DepartmentService } from "../../_services/department.service";
import { SemesterService } from "../../_services/semester.service";
import { UserService } from "../../_services/user.service";
import { TokenStorageService } from "../../_auth/token-storage.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "register.component.html",
})
export class RegisterComponent implements OnInit {
  signUpForm: FormGroup;
  errorMessage: string = '';

  selectedRole = [];

  isStudent: boolean = false;
  isSubmitted: boolean = false;

  semesters: Semester[];
  departments: Department[];
  authority: string;
  roles: string[];
  stdSignUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private semesterService: SemesterService,
    private departmentService: DepartmentService,
    private toastr: ToastrService,
    private tokenStorageService : TokenStorageService
  ) {}

  ngOnInit() {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      role: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
      sDetails: this.fb.group({
        batch: [''],
        academic_year: [''],
        semester: [''],
        department: [''],
        registration_num: [''],
      }),
    });

    if (this.tokenStorageService.getToken()) {
      this.roles = this.tokenStorageService.getAuthorities();
      this.roles.every((role) => {
          if (role === "ROLE_ADMIN") {
              this.authority = "admin";
              return false;
          } else if (role === "ROLE_PM") {
              this.authority = "pm";
              return false;
          }
          this.authority = "user";
          return true;
      });
  }

    this.loadSemester();
    this.loadDepartment();
  }

  //match password and confirm password
  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value
      ?null : {isMatching: true}
    }
  }

  onRoleChange(value) {
    if (this.selectedRole.length == 0) {
      this.selectedRole.push(value);
      if (value === "user") {
        this.isStudent = true;
      }
    } else if (this.selectedRole.length == 1) {
      this.selectedRole.splice(0, 1, value);

      if (this.selectedRole[0] === "user") {
        this.isStudent = true;
      } else {
        this.isStudent = false;
      }
    }
    this.signUpForm.patchValue({
      role: this.selectedRole,
    });
  }

  loadDepartment() {
    this.departmentService.getAll().subscribe((response) => {
      let resources = response["data"];
      this.departments = resources;
    });
  }

  loadSemester() {
    this.semesterService.getAll().subscribe((response) => {
      let resources = response["data"];
      this.semesters = resources;
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.selectedRole[0] === "user") {
      this.userService.add(this.signUpForm.value)
      .subscribe(response => {
        console.log(response);
        this.isSubmitted = false;
        this.toastr.success("User registered successfully!");
        this.signUpForm.reset({
          role: [''],
          sDetails: {
            batch: [''],
            academic_year: [''],
            semester: [''],
            department: [''],
            registration_num: [''],
          },
        });
      },
      (error) => {
        this.isSubmitted = false;
        this.errorMessage = error.error.message;
        this.toastr.error(this.errorMessage);
      }
      
      );
    } else {
      this.userService.submit(this.signUpForm.value as SignUp)
      .subscribe((response) => {
        this.isSubmitted = false;
        this.toastr.success(response["message"]);
        this.signUpForm.reset({
          role: [''],
          sDetails: {
            batch: [''] ,
            academic_year: [''],
            semester: [''],
            department: [''],
            registration_num: [''],
          },
        });
      },
      (error) => {
        this.isSubmitted = false;
        this.errorMessage = error.error.message;
        this.toastr.error(this.errorMessage);
      });
    }
  }
}
