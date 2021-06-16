import { Component, Inject, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, NavigationService } from 'ontimize-web-ngx';
import { Observable } from 'rxjs';

@Component({
  selector: 'login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  user: FormControl;
  password: FormControl;
  sessionExpired = false;

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    @Inject(NavigationService) public navigation: NavigationService,
    @Inject(AuthService) private authService: AuthService,
    public injector: Injector
  ) {
    const qParamObs: Observable<any> = this.actRoute.queryParams;
    qParamObs.subscribe(params => {
      if (params) {
        const isDetail = params['session-expired'];
        if (isDetail === 'true') {
          this.sessionExpired = true;
        } else {
          this.sessionExpired = false;
        }
      }
    });

  }

  ngOnInit(): any {
    this.authService.clearSessionData();
    this.navigation.setVisible(false);

    const userCtrl: FormControl = new FormControl('', Validators.required);
    const pwdCtrl: FormControl = new FormControl('', Validators.required);

    this.loginForm = new FormGroup({});
    this.loginForm.addControl('username', userCtrl);
    this.loginForm.addControl('password', pwdCtrl);

    if (this.authService.isLoggedIn()) {
      this.router.navigate(['../'], { relativeTo: this.actRoute });
    }
  }

  login() {
    if (!this.loginForm.valid) {
      alert('Campos no válidos');
    }

    const userName = this.loginForm.value['username'];
    const password = this.loginForm.value['password'];
    if (userName && userName.length > 0 && password && password.length > 0) {
      const self = this;
      this.authService.login(userName, password).subscribe(() => {
        self.sessionExpired = false;
        self.router.navigate(['../'], { relativeTo: this.actRoute });
      }, this.handleError);
    }
  }

  handleError(error) {
    switch (error.status) {
      case 401:
        console.error('Email or password is wrong.');
        break;
      default: break;
    }
  }

}
