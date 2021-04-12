import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { httpInterceptorProviders } from "./_auth/auth-interceptor";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

import { AppComponent } from "./app.component";

// Import containers
import { DefaultLayoutComponent } from "./containers";

import { P404Component } from "./views/error/404.component";
import { P500Component } from "./views/error/500.component";
import { LoginComponent } from "./views/login/login.component";

const APP_CONTAINERS = [DefaultLayoutComponent];

import {
  AppAsideModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from "@coreui/angular";

import { TabsModule } from 'ngx-bootstrap/tabs';

// Import forms module
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Import routing module
import { AppRoutingModule } from "./app.routing";

// Import 3rd party components
import { BsDropdownModule } from "ngx-bootstrap/dropdown";

// Import resolvers and services
import { ExamNameService } from "./_services/exam-name.service";
import { ExamNameResolver } from "./_resolvers/exam-name.resolver";
import { QuestionDetailService } from "./_services/question-details.service";
import { QuestionTypeService } from "./_services/question-type.service";
import { SemesterService } from "./_services/semester.service";
import { SubjectService } from "./_services/subject.service";
import { DepartmentService } from "./_services/department.service";
import { DepartmentResolver } from "./_resolvers/department.resolver";
import { SemesterResolver } from "./_resolvers/semester.resolver";
import { QuestionTypeResolver } from "./_resolvers/question-type.resolver";
import { ToastrModule } from "ngx-toastr";
import { AuthGuard } from "./_auth/auth.guard";
import { ExamComponent } from "./views/exam/exam.component";
import { UserService } from "./_services/user.service";
import { NgxPaginationModule } from "ngx-pagination";
import { ForgetPasswordComponent } from "./views/forget-password/forget-password.component";
import { ForgetPasswordService } from "./_services/forget-password.service";
import { ResetPasswordComponent } from "./views/forget-password/reset-password.component";
import { ExamInstruction } from "./views/exam/exam-instructions.component";
import { ExamSubjectService } from "./_services/exam-subject.service";
import { CanDeactivateGuard } from "./_auth/can-deactivate";
import { SecondsTransformModule } from "./second-transform.pipe";
import { AcademicYearService } from "./_services/academic-year.service";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    SecondsTransformModule,
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 1500,
      closeButton: true,
      preventDuplicates: true,
    })
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    ExamComponent,
    ExamInstruction,
    ForgetPasswordComponent,
    ResetPasswordComponent,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    httpInterceptorProviders,
    AuthGuard,
    CanDeactivateGuard,
    ExamNameService,
    DepartmentService,
    SemesterService,
    SubjectService,
    QuestionTypeService,
    QuestionDetailService,
    UserService,
    ForgetPasswordService,
    ExamNameResolver,
    ExamSubjectService,
    AcademicYearService,
    DepartmentResolver,
    SemesterResolver,
    QuestionTypeResolver,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
