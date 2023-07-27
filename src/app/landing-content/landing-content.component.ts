import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-content',
  templateUrl: './landing-content.component.html',
  styleUrls: ['./landing-content.component.css']
})
export class LandingContentComponent {
  isCollapse:boolean = true 

  collapse(){
    this.isCollapse = !this.isCollapse
  }
}
