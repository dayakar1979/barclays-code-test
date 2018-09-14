import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { ExchangeRatesComponent } from './exchange-rates/exchange-rates.component';

const routes: Routes = [
  { path: '', component: ExchangeRatesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  
  declarations: []
})
export class AppRoutingModule { }
