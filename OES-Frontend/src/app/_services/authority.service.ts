import { Injectable } from "@angular/core";
import { TokenStorageService } from "../_auth/token-storage.service";

@Injectable({
    providedIn: "root",
})
export class AuthorityService {
    roles: string[];
    authority: string;

    constructor(private tokenStorageService: TokenStorageService) { 
        if (this.tokenStorageService.getToken()) {
            this.roles = this.tokenStorageService.getAuthorities();
            this.roles.every((role) => {
                if (role === "ROLE_ADMIN") {
                    this.authority = "admin";
                    return false;
                } else if (role === "ROLE_PM") {
                    this.authority = "pm";
                    return false;
                }
                this.authority = "user";
                return true;
            });
        }
    }

    ngOnInit() {
      
    }
}
