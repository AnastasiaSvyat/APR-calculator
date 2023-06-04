import { Component, Input, OnDestroy, OnInit, forwardRef } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CurrencyList } from 'src/app/shared/data/currencyData';
import { Currency } from 'src/app/shared/model/currency';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { CalculatorService } from '../services/calculator.service';

export const CUSTOMINPUT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CurrencyComponent),
  multi: true,
};

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss'],
  providers: [CUSTOMINPUT_VALUE_ACCESSOR],
})

export class CurrencyComponent implements OnInit, ControlValueAccessor, OnDestroy {

  @Input() label!: string;
  private innerValue!: Currency;
  currentCurrency: Currency | undefined = CurrencyList[0]

  private onTouchedCallback: () => void = () => { };
  private onChangeCallback: (_: any) => void = () => { };

  protected currencyList: Currency[] = CurrencyList;
  public currencyFilterCtrl: FormControl = new FormControl();
  public filteredcurrencyList$: ReplaySubject<Currency[]> = new ReplaySubject<Currency[]>(1);
  protected _onDestroy = new Subject<void>();

  constructor(
    private calculatorService: CalculatorService
  ) { }

  ngOnInit() {
    this.filteredcurrencyList$.next(this.currencyList.slice());
    this.currencyFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterList();
      });
  }

  protected filterList() {
    if (!this.currencyList) {
      return;
    }
    let search = this.currencyFilterCtrl.value;
    if (!search) {
      this.filteredcurrencyList$.next(this.currencyList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredcurrencyList$.next(
      this.currencyList.filter(currency => currency.title.toLowerCase().indexOf(search) > -1)
    );
  }

  get value(): Currency {
    return this.innerValue;
  }

  set value(v: Currency) {
    this.currentCurrency = this.currencyList.find(currency => currency.title === v.title);
    if (v !== this.innerValue) {
      this.calculatorService.changeCurrency(v)
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  writeValue(value: Currency) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
