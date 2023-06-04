import { Component, forwardRef, Input, ViewChild, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl, NG_VALIDATORS, Validator, FormGroup } from '@angular/forms';
import { CalculatorService } from '../services/calculator.service';
import { Currency } from 'src/app/shared/model/currency';

export const CUSTOMINPUT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AmountComponent),
  multi: true,
};

export const CUSTOMINPUT_VALUE_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => AmountComponent),
  multi: true,
};

@Component({
  selector: 'app-amount',
  templateUrl: './amount.component.html',
  styleUrls: ['./amount.component.scss'],
  providers: [CUSTOMINPUT_VALUE_ACCESSOR, CUSTOMINPUT_VALUE_VALIDATOR],

})
export class AmountComponent implements ControlValueAccessor, Validator {

  @Input() label!: string;
  @ViewChild('amount') input!: FormGroup;

  private innerValue!: number;

  private onTouchedCallback: () => void = () => { };
  private onChangeCallback: (_: any) => void = () => { };

  constructor(
    private calculatorService: CalculatorService
  ) { }

  get value(): number {
    return this.innerValue;
  }

  set value(v: number) {
    if (v !== this.innerValue) {
      this.input.valid ? this.calculatorService.changeAmount(v) : this.calculatorService.changeAmount(0)
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  writeValue(value: number) {
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

  public validate(c: FormControl) {
    return c.errors;
  }
}
