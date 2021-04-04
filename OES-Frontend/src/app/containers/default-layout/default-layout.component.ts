import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../_auth/token-storage.service';
import { adminNavItems , studentNavItems, teacherNavItems} from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  private roles: string[];
  public authority: string;
  public sidebarMinimized = false;
  public adminNavItems = adminNavItems;
  public studentNavItems = studentNavItems;
  public teacherNavItems = teacherNavItems;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  constructor(private token: TokenStorageService,
              private router: Router) { }

  ngOnInit() {
    if (this.token.getToken()) {
      this.roles = this.token.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } else if (role === 'ROLE_PM') {
          this.authority = 'pm';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
  }
  
  logout() {
    this.token.signOut();
    this.router.navigate(['/login']);
  }
}
