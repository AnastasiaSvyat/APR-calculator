import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit{

  sliderForm!: FormGroup;

  loremInformationText: string = `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
    Minus cumque animi  mollitia ipsam quae fuga voluptatibus 
    aut quia autem nulla corrupti suscipit quam, rem`;

    ngOnInit(): void {
      this.sliderForm = new FormGroup ({
        slider: new FormControl(true)
      })
    }

  get slider() { return this.sliderForm.get('slider'); }

}