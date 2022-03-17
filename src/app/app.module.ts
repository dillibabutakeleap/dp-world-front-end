import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsModule } from './shared/modules/icons-module.module';
import { MatMenuModule } from '@angular/material/menu';
import { AuthModule } from './components/auth/auth.module';
import { AuthGuard } from './components/auth/auth.guard';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ErrorInterceptor } from './shared/interceptors/error-interceptor.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    IconsModule,
    MatMenuModule,
    AuthModule,
    NgxSpinnerModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
