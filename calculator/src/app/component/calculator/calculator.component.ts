import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CurrencyList } from 'src/app/shared/data/currencyData';
import { Currency } from 'src/app/shared/model/currency';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  currencyList: Currency[] = CurrencyList;
  calculatorForm!: FormGroup;

  ngOnInit(): void {
    this.calculatorForm = new FormGroup({
      amount: new FormControl(1000,
        [
          Validators.required,
          Validators.min(2),
          Validators.maxLength(2),
        ]),
      currency: new FormControl(this.currencyList[0]),
      period: new FormControl(1),
    });
  }

}
