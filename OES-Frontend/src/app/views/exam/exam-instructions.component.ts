import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    templateUrl: "exam-instructions.component.html"
})
export class ExamInstruction {
    isSubmitted: boolean = true;

    constructor(private router: Router) { }

    onRead() {
        this.isSubmitted = !this.isSubmitted;
    }
    onSubmit() {
        this.router.navigate(['/exam']);
    }
}