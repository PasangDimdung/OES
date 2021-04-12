import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../../_auth/auth.service";
import { AuthLoginInfo } from "../../_auth/login-info";
import { TokenStorageService } from "../../_auth/token-storage.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "login.component.html",
  styles: [
    "@keyframes scale{0%{transform:scaleX(.1)}to{transform:scaleX(.95)}}.loading-bar{position:fixed;display:block;top:0;left:0;z-index:1000;width:100%;height:4px;background:#20a8d8;transform-origin:left;visibility:hidden;will-change:visibility;transition:visibility .2s linear}.loading-bar.loading{visibility:visible;animation:scale 10s linear}",
  ],
})
export class LoginComponent {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = "";
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;

  isSubmitted: boolean = false;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private toastr: ToastrService,
    private route: Router
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.isSubmitted = true;

    this.loginInfo = new AuthLoginInfo(this.form.username, this.form.password);

    this.authService.attemptAuth(this.loginInfo)
    .subscribe((response) => {
        this.isSubmitted = false;
        this.tokenStorage.saveUserId(response["userId"]);
        this.tokenStorage.saveToken(response.accessToken);
        this.tokenStorage.saveUsername(response.username);
        this.tokenStorage.saveAuthorities(response.authorities);
        this.roles = this.tokenStorage.getAuthorities();
        this.route.navigate(["/dashboard"]);
        this.toastr.success("Logged in as " + this.roles);
      },
      (error) => {
        this.isSubmitted = false;
        this.errorMessage = error.error.message;
        this.toastr.error(this.errorMessage);
      }
    );
  }
}
