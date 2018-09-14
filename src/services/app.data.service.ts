import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/onErrorResumeNext'

@Injectable()
export class AppDataService {
  exchangeRateList: any = [];
  constructor(private httpClient?: HttpClient) { }
  getExchangeRates(url) {
    let response = this.httpClient.get(url).map((res) => res)

    return response;
  }
}

