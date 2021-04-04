// Angular
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

// Components
import { AddQuestionTypeComponent } from "./add-question-type/add-question-type.component";

// Components Routing
import { QuestionTypeRoutingModule } from "./question-type-routing.module";
import { QuestionTypeListComponent } from "./question-type-list/question-type-list.component";
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    QuestionTypeRoutingModule,
  ],
  declarations: [AddQuestionTypeComponent, QuestionTypeListComponent],
})
export class QuestionTypeModule {}
