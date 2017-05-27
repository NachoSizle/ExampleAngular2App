import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'city-list-app',
  templateUrl: './city.list.component.html',
})

export class CityListAppComponent {

  public resultSearchCityComp: string;
  public isCityFounded: boolean = false;
  public cityToSearch: string;

  constructor(){ }

  searchThisCity(value: string){
    this.isCityFounded = true;
    this.cityToSearch = value;
    console.log("Se va a buscar: " + this.cityToSearch);
  }
}
