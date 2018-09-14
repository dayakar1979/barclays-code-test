import { Component, OnInit, Pipe } from '@angular/core';
import { AppDataService } from '../../services/app.data.service';
import { ExchangeRate } from './exchange'
import { isNullOrUndefined } from 'util';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.css']
})
export class ExchangeRatesComponent implements OnInit {
  
  exchangeRateList: any = [];
  selectedDateModel: any = new Date();
  selectedBaseModel: any = 'EUR';
  errorMessage = '';
  baseUrl = 'https://api.exchangeratesapi.io/';
  baseOptions = [
    { id: "EUR", name: "EUR" },
    { id: "USD", name: "USD" },
    { id: "GBP", name: "GBP" },
    { id: "AUD", name: "AUD" },
    { id: "CAD", name: "CAD" },
    { id: "JPY", name: "JPY" },
  ];
  headerList = ['Currency', 'Buy', 'Sell'];
  
  constructor(private appDataService?: AppDataService) { }

  ngOnInit() {
    this.exchangeRateList = [];
    var datePipe = new DatePipe("en-US");
    let dateval = datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.selectedDateModel = dateval;
    this.getExchangeRates(true);
  }

  getColor(value) : string {
    return this.baseOptions.findIndex( x => x.id == value) > -1 ? 'red' : 'black';
  }
  
  onSorted(event) {
    let temp: any[] = Object.assign([{}], this.exchangeRateList);
    this.exchangeRateList = [];
    if (event.sortDirection === 'desc') {
      this.exchangeRateList = this.sortArray(temp, event.sortColumn, true);
    } else {
      this.exchangeRateList = this.sortArray(temp, event.sortColumn, false);
    }
  }

  sortArray(arr: Array<any>, prop: any, reverse: boolean = false): any {
    if (arr === undefined) return
    const m = reverse ? -1 : 1
    return arr.sort((a: any, b: any): number => {
      const x = a[prop]
      const y = b[prop]
      return (x === y) ? 0 : (x < y) ? -1 * m : 1 * m
    })
  }

  getExchangeRates(initialLoad) {
    if( this.errorMessage != '') {
      this.errorMessage = "Please select date.";
      return ;
    }
    this.exchangeRateList = [];
    let url = ''
    if (initialLoad) {
      url = this.baseUrl + 'latest';
    } else {
      var datePipe = new DatePipe("en-US");
      let date = datePipe.transform(new Date(this.selectedDateModel), 'yyyy-MM-dd');
      url = this.baseUrl + date + '?base=' + this.selectedBaseModel;
    }
    this.appDataService.getExchangeRates(url).subscribe(data => {
      this.createDataList(data);
    });
  }

  createDataList(data) {
    if (!isNullOrUndefined(data)) {
      let ratesObj = data.rates;
      let currencyList = Object.keys(ratesObj);
      for (let currency of currencyList) {
        let perValue = this.percentage(ratesObj[currency], 5);
        let buyValue = ratesObj[currency] - perValue;
        let sellValue = ratesObj[currency] + perValue;
        let colorval = this.getColor(currency);
        let exchange: ExchangeRate = { currency: currency, buy: buyValue, sell: sellValue, color:colorval };
        this.exchangeRateList.push(exchange);
      }
    }
  }

  dateChange(event) {
     if(event.target.value == '') {
       this.errorMessage = "Please select date.";
    } else {
      this.errorMessage = "";
    }
  }

  percentage(num, per) {
    return (num / 100) * per;
  }

  changeValue(event) {
    console.log(event.data);
  }
}

export class ExchangeSearchCriteria {
  sortColumn: string;
  sortDirection: string;
}