import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ForgetPasswordService } from "../../_services/forget-password.service";

@Component({
  selector: "app-forget-password",
  templateUrl: "forget-password.component.html",
  styles: [
    "@keyframes scale{0%{transform:scaleX(.1)}to{transform:scaleX(.95)}}.loading-bar{position:fixed;display:block;top:0;left:0;z-index:1000;width:100%;height:4px;background:#20a8d8;transform-origin:left;visibility:hidden;will-change:visibility;transition:visibility .2s linear}.loading-bar.loading{visibility:visible;animation:scale 10s linear}",
  ],
})
export class ForgetPasswordComponent {
  errorMessage: string = '';
  isSubmitted: boolean = false;

  constructor(
    private forgetPasswordService: ForgetPasswordService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  forgetPasswordForm = new FormGroup({
    email: new FormControl("", [Validators.required]),
  });

  onSubmit() {
    this.isSubmitted = true;
    this.forgetPasswordService.submit(this.forgetPasswordForm.value)
    .subscribe((response) => {
        this.isSubmitted = false;
        this.toastr.success(response["message"], "", {
          timeOut: 3200,
        });
        this.forgetPasswordForm.reset();
        this.router.navigate["/reset-password"];
      },
      (error) => {
        this.isSubmitted = false;
        this.errorMessage = error.error.message;
        this.toastr.error(this.errorMessage);
      }
    );
  }
}
