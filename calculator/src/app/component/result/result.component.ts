import { Component, OnInit } from '@angular/core';
import { CalculatorComponent } from '../calculator/calculator.component';
import { CalculatorService } from '../services/calculator.service';
import { Observable } from 'rxjs';
import { Result } from 'src/app/shared/model/result';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit{

  result!: Result | null;

  constructor(
    private calculatorService: CalculatorService
  ){}

  ngOnInit(): void {
    this.calculatorService.calculate();
    this.calculatorService.result$.subscribe((res) => {
      this.result = res;
    })
  }
}
