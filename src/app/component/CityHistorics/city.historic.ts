import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'city-historics-search',
  templateUrl: './city.historic.html',
})

export class CityHistoricAppComponent {

  public cityResultSearch: string[];
  public showCitySelected: boolean;
  public showCitySaved: boolean;
  public cityToShow: string;

  constructor(){
    this.showCitySelected = false;
    this.showCitySaved = true;
    this.cityResultSearch = JSON.parse(localStorage.getItem('cities'));
  }

  showCityWhenUserClick(city: string){
    this.cityToShow = city;
    this.showCitySelected = true;
    this.showCitySaved = false;
  }

  showListCities(){
    this.showCitySelected = false;
    this.showCitySaved = true;
  }
}
