import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ForgetPasswordService } from "../../_services/forget-password.service";

@Component({
  selector: "app-reset-password",
  templateUrl: "reset-password.component.html",
  styles: [
    "@keyframes scale{0%{transform:scaleX(.1)}to{transform:scaleX(.95)}}.loading-bar{position:fixed;display:block;top:0;left:0;z-index:1000;width:100%;height:4px;background:#20a8d8;transform-origin:left;visibility:hidden;will-change:visibility;transition:visibility .2s linear}.loading-bar.loading{visibility:visible;animation:scale 10s linear}",
  ],
})
export class ResetPasswordComponent {
  errorMessage: string = '';

  isSubmitted: boolean = false;

  form: any = {};

  constructor(
    private forgetPasswordService: ForgetPasswordService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onSubmit() {
    this.isSubmitted = true;
    this.route.queryParams.subscribe((params) => {
      this.form.resetPasswordToken = params["token"];
    });
    this.forgetPasswordService.reset(this.form)
    .subscribe((response) => {
        this.isSubmitted = false;
        this.goLoginPage();
        this.toastr.success(response["message"], "", {
          timeOut: 3200,
        });
      },
      (error) => {
        this.isSubmitted = false;
        this.errorMessage = error.error.message;
        this.toastr.error(this.errorMessage);
      }
    );
  }

  goLoginPage() {
    return this.router.navigate(["/login"]);
  }
}
