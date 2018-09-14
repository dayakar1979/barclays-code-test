import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ExchangeRatesComponent } from './exchange-rates/exchange-rates.component';
import { AppDataService } from '../services/app.data.service';
import { HttpClientModule } from '@angular/common/http';
import { SortableColumnComponent } from './sortable-column/sortable-column.component';
import { SortService } from '../services/sort.service';
import { SortableDirective } from './directives/sortable.directive';

@NgModule({
  declarations: [
    AppComponent,
    ExchangeRatesComponent,
    SortableColumnComponent,
    SortableDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, RouterModule, HttpClientModule, FormsModule
  ],
  providers: [AppDataService, SortService],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
