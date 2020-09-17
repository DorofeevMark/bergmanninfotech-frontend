import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartDirective } from './core/chart/chart.directive';
import {HttpClientModule} from '@angular/common/http';
import { ChardAddDialogComponent } from './chard-add-dialog/chard-add-dialog.component';
import {CoreModule} from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ChartDirective,
    ChardAddDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
