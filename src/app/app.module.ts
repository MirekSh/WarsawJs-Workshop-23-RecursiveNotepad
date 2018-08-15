import { AuthService } from './services/AuthService';
import { CqrsBus } from './services/cqrs/CqrsBus';
import { ErrorService } from './services/ErrorService';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabsModule } from './tabs.module';
import { AuthComponent } from './components/auth/auth.component';
import { StorageService } from './services/storage.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations:
  [
    AppComponent,
    AuthComponent
  ],
  imports:
  [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MatSnackBarModule,
    TabsModule
  ],
  providers:
  [
      CqrsBus,
      StorageService,
      AuthService,
      ErrorService
    ],
  bootstrap:
    [
      AppComponent
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
