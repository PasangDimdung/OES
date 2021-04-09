import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

// Question Components
import { AddQuestionComponent } from "./add-question/add-question.component";

// Components Routing
import { QuestionRoutingModule } from "./question-routing.module";
import { ViewQuestionComponent } from "./view-question/view-question.component";

@NgModule({
  imports: [
    CommonModule,
    QuestionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [AddQuestionComponent, ViewQuestionComponent],
})
export class QuestionModule {}
