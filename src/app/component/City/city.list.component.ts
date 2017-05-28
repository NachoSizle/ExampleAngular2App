import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'city-list-app',
  templateUrl: './city.list.component.html',
})

export class CityListAppComponent {

  public resultSearchCityComp: string;
  public isCityFounded: boolean = false;
  public showHistoric: boolean = false;
  public showSearchCity: boolean = true;
  public cityToSearch: string;
  public nameApp: string;

  constructor(){
    this.nameApp = "Weather";
  }

  searchThisCity(value: string){
    this.isCityFounded = true;
    this.cityToSearch = value;
    console.log("Se va a buscar: " + this.cityToSearch);

    var allCities: string[] = JSON.parse(localStorage.getItem('cities'));

    if(allCities === null){
      allCities = [];
    }

    allCities.push(value);
    localStorage.setItem("cities", JSON.stringify(allCities));
  }

  changeViewHistoric(show: boolean){
    this.showHistoric = !show;
    this.showSearchCity = show;

    this.isCityFounded = false;
  }
}
