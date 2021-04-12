import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Import Containers
import { DefaultLayoutComponent } from "./containers";

// Import Components
import { P404Component } from "./views/error/404.component";
import { P500Component } from "./views/error/500.component";
import { LoginComponent } from "./views/login/login.component";
import { ExamComponent } from "./views/exam/exam.component";

// Import Guard
import { AuthGuard } from "./_auth/auth.guard";
import { ForgetPasswordComponent } from "./views/forget-password/forget-password.component";
import { ResetPasswordComponent } from "./views/forget-password/reset-password.component";
import { ExamInstruction } from "./views/exam/exam-instructions.component";
import { CanDeactivateGuard } from "./_auth/can-deactivate";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
  {
    path: "404",
    component: P404Component,
    data: {
      title: "Page 404",
    },
  },
  {
    path: "500",
    component: P500Component,
    data: {
      title: "Page 500",
    },
  },
  {
    path: "login",
    component: LoginComponent,
    data: {
      title: "Login Page",
    },
  },
  {
    path: "reset_password",
    component: ResetPasswordComponent
  },
  {
    path: "forget-password",
    component: ForgetPasswordComponent
  },
  {
    path: "exam",
    component: ExamComponent,
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: "exam-instructions",
    component: ExamInstruction,
    canActivate: [AuthGuard]
  },
  {
    path: "",
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: "Home",
    },
    children: [
      {
        path: "exam-name",
        loadChildren: () => import("./views/exam-name/exam-name.module").then(m => m.ExamNameModule),
      },
      {
        path: "question",
        loadChildren: () => import("./views/question/question.module").then(m => m.QuestionModule),
      },
      {
        path: "dashboard",
        loadChildren: () => import("./views/dashboard/dashboard.module").then(m => m.DashboardModule),
      },
      {
        path: "department",
        loadChildren: () => import("./views/department/department.module").then(m => m.DepartmentModule),
      },
      {
        path: "semester",
        loadChildren: () => import("./views/semester/semester.module").then(m => m.SemesterModule),
      },
      {
        path: "subject",
        loadChildren: () => import("./views/subject/subject.module").then(m => m.SubjectModule),
      },
      {
        path: "profile",
        loadChildren: () => import("./views/profile/profile.module").then(m => m.ProfileModule),
      },
      {
        path: "question-type",
        loadChildren: () =>import("./views/question-type/question-type.module").then(m => m.QuestionTypeModule),
      },
      {
        path: "question-paper",
        loadChildren: () => import("./views/question-paper/question-paper.module").then(m => m.AddQuestionPaperModule),
      },
      {
        path: "register",
        loadChildren: () => import("./views/register/register.module").then(m => m.RegisterModule),
      },
      {
        path: "report",
        loadChildren: () => import("./views/report/report.module").then(m => m.ReportModule),
      },
      {
        path: "academic-year",
        loadChildren: () => import("./views/academic-year/academic-year.module").then(m => m.AcademicYearModule),
      },
    ],
  },
  { path: "**", component: P404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
