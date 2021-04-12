import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, ValidatorFn, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TokenStorageService } from "../../_auth/token-storage.service";
import { ForgetPasswordService } from "../../_services/forget-password.service";

@Component({
  templateUrl: "profile.component.html",
})
export class ProfileComponent implements OnInit {
  info: any;
  changePasswordForm: any;
  fullName: any;
  userName: any;
  email: any;
  department: any;
  semester: any;

  constructor(private token: TokenStorageService,
              private router: Router,
              private fb: FormBuilder,
              private http: HttpClient,
              private forgetPasswordService: ForgetPasswordService
              ) {}

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities(),
    };

    this.http.get("http://localhost:8080/api/user/" + this.token.getUserId())
    .subscribe(response => {
      console.log(response);
      var resources = response['data'];
      this.fullName = resources['name'];
      this.userName = resources['username'];
      this.email = resources['email'];
      // this.department = resources['sDetails']['department'];
      // this.semester = resources['sDetails']['semester'];
    })

    this.changePasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      newPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      confirmPassword: ['', [Validators.required, this.matchValues('newPassword')]],
    });
  }

    //match password and confirm password
    matchValues(matchTo: string): ValidatorFn {
      return (control: AbstractControl) => {
        return control?.value === control?.parent?.controls[matchTo].value
        ?null : {isMatching: true}
      }
    }

    updatePassword(){
      this.forgetPasswordService.resetOldPassword(this.changePasswordForm.value)
      .subscribe(res=> {
        console.log(res);
      })
    }

  logout() {
    this.token.signOut();
    this.router.navigate(['/login']);
  }
}
