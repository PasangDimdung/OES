import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ProfileRoutingModule } from "./profile-routing.module";
import { ProfileComponent } from "./profile.component";

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ProfileRoutingModule, TabsModule],
  declarations: [ProfileComponent],
})
export class ProfileModule {}
