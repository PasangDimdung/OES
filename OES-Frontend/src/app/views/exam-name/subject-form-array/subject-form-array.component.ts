import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from "@angular/core";
import { FormArray } from "@angular/forms";

@Component({
    selector: "app-subject-form-array",
    template: "<ng-content></ng-content>",
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class SubjectFormArrayComponent {
    private internalFormArray: FormArray;
    @Input()
    set formArray(formArray: FormArray) {
      this.internalFormArray = formArray;
    }
    get formArray() {
      return this.internalFormArray;
    }
  
    @Output() add = new EventEmitter<FormArray>();
  
    constructor() {}
  }
  