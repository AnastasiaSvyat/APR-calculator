import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './shared/material/material.module';
import { AmountComponent } from './component/amount/amount.component';
import { CurrencyComponent } from './component/currency/currency.component';
import { PeriodComponent } from './component/period/period.component';
import { ResultComponent } from './component/result/result.component';
import { FooterComponent } from './component/footer/footer.component';
import { NavComponent } from './component/nav/nav.component';
import { CalculatorComponent } from './component/calculator/calculator.component';
import { OtherComponent } from './component/other/other.component';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
  declarations: [
    AppComponent,
    AmountComponent,
    CurrencyComponent,
    PeriodComponent,
    ResultComponent,
    FooterComponent,
    NavComponent,
    CalculatorComponent,
    OtherComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    TooltipModule,
    NgxMatSelectSearchModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
