import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CurrencyList } from 'src/app/shared/data/currencyData';
import { Currency } from 'src/app/shared/model/currency';
import { Result } from 'src/app/shared/model/result';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  currencyList: Currency[] = CurrencyList;

  private _amount$: BehaviorSubject<number> = new BehaviorSubject<number>(1000);
  private _currency$: BehaviorSubject<Currency> = new BehaviorSubject<Currency>(this.currencyList[0]);
  private _period$: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  private _result$: BehaviorSubject<Result | null> = new BehaviorSubject<Result | null>(null);
  public result$ = this._result$.asObservable();

  constructor() { }

  calculate() {
    let sum = this._amount$.value * this._currency$.value.percent / 100 / 12 * this._period$.value;
    let percent = sum * 100 / this._amount$.value;

    let result: Result = {
      sum: sum,
      percent: percent
    }
    this._amount$.value ? this._result$.next(result) : this._result$.next(null)
  }

  changeAmount(count: number) {
    this._amount$.next(count);
    this.calculate()
  }

  changePeriod(period: number) {
    this._period$.next(period);
    this.calculate()
  }

  changeCurrency(currency: Currency) {
    this._currency$.next(currency);
    this.calculate()
  }
}
