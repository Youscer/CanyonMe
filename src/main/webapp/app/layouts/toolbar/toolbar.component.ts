import { CartService } from './../../cart/services/cart.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VERSION } from 'app/app.constants';
import { Router } from '@angular/router';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { AccountService } from 'app/core/auth/account.service';
import { SessionStorageService } from 'ngx-webstorage';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from 'app/login/login.service';
import { Account } from 'app/core/auth/account.model';
import { LANGUAGES } from 'app/config/language.constants';
import { OnInit, Component } from '@angular/core';


@Component({
  selector: 'jhi-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolBarComponent implements OnInit {
  inProduction?: boolean;
  isNavbarCollapsed = true;
  languages = LANGUAGES;
  openAPIEnabled?: boolean;
  version = '';
  account: Account | null = null;

  searchword: string = "";
  searchForm: FormGroup;

  hideBadge: boolean = false;

  constructor(
    private loginService: LoginService,
    private translateService: TranslateService,
    private sessionStorageService: SessionStorageService,
    private accountService: AccountService,
    private profileService: ProfileService,
    private router: Router,
    private fb: FormBuilder,
    private cartService: CartService
  ) {
    if (VERSION) {
      this.version = VERSION.toLowerCase().startsWith('v') ? VERSION : 'v' + VERSION;
    }
    this.searchForm = this.fb.group({ name: [''] });
  }

  ngOnInit(): void {
    this.profileService.getProfileInfo().subscribe(profileInfo => {
      this.inProduction = profileInfo.inProduction;
      this.openAPIEnabled = profileInfo.openAPIEnabled;
    });
    this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
  }

  searchThis(): void {
    this.router.navigate(['/catalog'], { queryParams: { s: this.searchword } });
  }
  resetSearch(): void {
    this.searchword = "";
  }

  getCartItemCount(): number {
    const totalQuantity = this.cartService.getTotalQuantity();
    if (totalQuantity > 0){
      this.hideBadge = false;
    } else {
      this.hideBadge = true;
    }
    return totalQuantity;
  }

  logout(): void {
    this.resetSearch();
    this.loginService.logout();
    this.router.navigate(['']);
  }
}