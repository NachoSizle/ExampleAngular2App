import { Component } from '@angular/core';

@Component({
  selector: 'navbar-app',
  templateUrl: './navbar.component.html'
})

export class NavBarComponent {

  public nameApp: string;

  constructor(){
    this.nameApp = "Weather";
  }
}
