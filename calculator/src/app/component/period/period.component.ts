import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { PeriodData } from 'src/app/shared/data/periodData';
import { CalculatorService } from '../services/calculator.service';

export const CUSTOMINPUT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PeriodComponent),
  multi: true,
};

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.scss'],
  providers: [ CUSTOMINPUT_VALUE_ACCESSOR ],
})
export class PeriodComponent implements ControlValueAccessor {

  @Input() label!: string;

  private innerValue!: number;
  periodList: number[] = PeriodData;
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
      this.calculatorService.changePeriod(v)
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
}
