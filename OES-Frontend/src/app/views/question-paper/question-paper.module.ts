import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { CommonModule } from "@angular/common";
import { AddQuestionPaperComponent } from "./add-question-paper/add-question-paper.component";
import { AddQuestionPaperRoutingModule } from "./question-paper-routing";
import { ViewQuestionPaperComponent } from "./view-question-paper/view-question-paper.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AddQuestionPaperRoutingModule,
  ],
  declarations: [AddQuestionPaperComponent, ViewQuestionPaperComponent],
})
export class AddQuestionPaperModule {}
