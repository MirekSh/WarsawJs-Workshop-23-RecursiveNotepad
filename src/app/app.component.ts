import { AuthService } from './services/AuthService';
// import { MatSnackBar } from '@angular/material';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
 
    <div class="header">      
       <span class="title" id="app-title">Recursive Notepad</span> 
       <auth></auth>        
    </div>
         
    <button *ngIf="!showTabs" (click)="Demo()" class="margin-top btn btn-danger center-block">See Example</button>
    <tabs *ngIf="showTabs"></tabs>

    <simple-clock theme="gray" (clicked)="OnClockClick($event)"></simple-clock>

    `,
  styleUrls: ['app.component.css']
})
export class AppComponent
{
  showTabs: boolean = false;

  constructor(private _auth: AuthService//, public _snackBar: MatSnackBar
  )
  {
    this.showTabs = _auth.IsLoggedIn();

    _auth.LoginStatusChanged.subscribe((loginStatus: boolean) => this.showTabs = loginStatus);
  }

  openSnackBar()
  {
  //  this._snackBar.open("yo!", null, { duration: 1000 });
  }

  Demo()
  {
    this._auth.Login("demo@demo.com", "demo");
  }
}
