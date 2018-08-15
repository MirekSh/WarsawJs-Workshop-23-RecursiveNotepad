import { AuthService, LoginStatus, RegisterStatus } from './../../services/AuthService';
import { Component } from '@angular/core';

enum AuthFormViewState
{
  Initial, Logging, LoggedIn, UserNotFound, WrongPassword,
  Registering, EmailTaken
}

@Component({
  selector: 'auth',
  template: `

    <div class="form-inline">
    
      <div class="form-group">
        <input type="text" #email                  
              id="auth-login-input"
              [ngClass]="{ 'alert-danger': emailInputError, 'hide': !inputsVisible }"
              placeholder="E-mail"
              class="form-control"
              (keydown.enter)="Login(email.value, pass.value)"
              value="">
      </div>
   
      <div class="form-group" >   
        <input type="password" #pass    
              id="auth-password-input"            
              [ngClass]="{ 'alert-danger': passwordInputError, 'hide': !inputsVisible }"
              placeholder="Password" 
              class="form-control"
              (keydown.enter)="Login(email.value, pass.value)"
              value="">
      </div> 
    
      <div class="form-group">
        <button *ngIf="loginButtonVisible"
                id="auth-login-button"
                (click)="Login(email.value, pass.value)"
                class="btn btn-primary">{{ loginButtonText }}</button>
        <button *ngIf="logoutButtonVisible" 
                id="auth-logout-button"
                (click)="Logout()"
                class="btn">Logout</button> 
      </div> 
      
      <div class="form-group">
        <button *ngIf="loginButtonVisible"
                id="auth-register-button"
                (click)="Register(email.value, pass.value)"
                class="btn btn-default">{{ registerButtonText }}</button>    
      </div>

    </div>
    `,
  styles:
  [`
    .little-margin-top { margin-top: 12px }
    .hide { display: none } 
  `] // because [hidden] is not working with .form-control
})
export class AuthComponent 
{
  private inputsVisible: boolean = true;
  private loginButtonVisible: boolean = true;
  private logoutButtonVisible: boolean = false;
  private loginButtonText: string = "Login";
  private registerButtonText: string = "Register";
  private emailInputError: boolean = false; // to nie powinno mieć nazwy określającej błąd a coś bardziej powiązanego z ramką
  private passwordInputError: boolean = false; // to nie powinno mieć nazwy określającej błąd a coś bardziej powiązanego z ramką

  constructor(private _auth: AuthService)
  {
    if (_auth.IsLoggedIn())  this.SetFormState(AuthFormViewState.LoggedIn);

    _auth.LoginStatusChanged.subscribe((loginStatus: boolean) => 
    {
      if (loginStatus == true)
      {
        this.SetFormState(AuthFormViewState.LoggedIn);
      }
    });

    // TODO nasłuchiwanie zmian w serwisie
  }

  private SetFormState(state: AuthFormViewState)
  {
    this.inputsVisible = true;
    this.loginButtonText = "Login";
    this.registerButtonText = "Register";
    this.loginButtonVisible = true;
    this.logoutButtonVisible = false;
    this.emailInputError = false;
    this.passwordInputError = false;

    switch (state)
    {
      default:
      case AuthFormViewState.Initial:
        // do nothing
        break;
      case AuthFormViewState.Logging:
        this.loginButtonText = "Logging...";
        break;
      case AuthFormViewState.LoggedIn:
        this.inputsVisible = false;
        this.loginButtonVisible = false;
        this.logoutButtonVisible = true;
        break;
      case AuthFormViewState.UserNotFound:
        this.emailInputError = true;
        break;
      case AuthFormViewState.WrongPassword:
        this.passwordInputError = true;
        break;
      case AuthFormViewState.Registering:
        this.registerButtonText = "Registering...";
        break;
      case AuthFormViewState.EmailTaken:
        this.emailInputError = true;
        break;
    }
  }


  private async Login(email: string, pass: string): Promise<void>
  {
    this.SetFormState(AuthFormViewState.Logging);

    let status: LoginStatus = await this._auth.Login(email, pass);

    switch (status)
    {
      case LoginStatus.LoggedIn: this.SetFormState(AuthFormViewState.LoggedIn);
        break;
      case LoginStatus.UserNotFound: this.SetFormState(AuthFormViewState.UserNotFound);
        break;
      case LoginStatus.WrongPassword: this.SetFormState(AuthFormViewState.WrongPassword);
        break;
      default: this.SetFormState(AuthFormViewState.Initial);
        break;
    }
  }

  private async Register(email: string, pass: string): Promise<void>
  {
    this.SetFormState(AuthFormViewState.Registering);

    let status: RegisterStatus = await this._auth.Register(email, pass);

    switch (status)
    {
      case RegisterStatus.Registered: this.SetFormState(AuthFormViewState.LoggedIn);
        break;
      case RegisterStatus.EmailTaken: this.SetFormState(AuthFormViewState.EmailTaken);
        break;
      default: this.SetFormState(AuthFormViewState.Initial);
        break;
    }
  }

  private Logout()
  {
    this._auth.Logout();

    this.SetFormState(AuthFormViewState.Initial);
  }
}
