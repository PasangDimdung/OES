import { ChangeDetectionStrategy, Component, Input} from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
  
export function SubjectFormGroup(formBuilder: FormBuilder) {
    return formBuilder.group({
      name: [],
      starting_date: [],
      ending_date: []
    });
}
export function SubjectDatesFormGroup(formBuilder: FormBuilder) {
    return formBuilder.group({
      starting_date: [],
      ending_date: []
    });
}
  
@Component({
    selector: "app-subject-form",
    templateUrl: "./subject-form.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class SubjectFormComponent {
    @Input() formGroup: FormGroup;
  
    constructor() {}
}
  