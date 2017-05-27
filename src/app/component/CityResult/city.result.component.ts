import { Component, Input, ElementRef, Renderer2, ViewChild, AfterViewInit } from '@angular/core';
import { CityServices } from './CityServices';

@Component({
  selector: 'city-result',
  templateUrl: './city.result.component.html',
  providers: [CityServices]
})

//https://www.google.com/maps/embed/v1/search?q=&key=AIzaSyBnqUQM3sEzfph4qdGIMM6PSenBgPC3IPY

export class CityResultComponent implements AfterViewInit{
  @Input() citySelected: string;
  @ViewChild('iframeMapsContainer') iframe:ElementRef;

  public cityFound: City;
  public ptosGeoOfCity: PtosGeolocation;
  public citiesServices: CityServices;
  public stationFounded: StationTemperature;
  public stationDataFound: any;
  public dataFound: any;
  public errorMessage: any;

  constructor(private _citiesServices: CityServices, private rd: Renderer2){
    this.citiesServices = _citiesServices;
  }

  ngAfterViewInit(){
    console.log(this.rd);
    console.log(this.iframe);
  }

  ngOnChanges(){
    this.getCityFromName();
  }

  getCityFromName(){
    console.log(this.citySelected);

    this._citiesServices.getCity(this.citySelected).subscribe(
      result => {
        this.dataFound = result['geonames'][0];
        this.parseDataFound();
      }, error => {
        this.errorMessage = <any>error;
        if(this.errorMessage !== null){
          console.log(this.errorMessage);
        }
      });
  }

  parseDataFound(){
    console.log(this.dataFound);
    var ptosGeoFromData = this.dataFound.bbox;

    this.ptosGeoOfCity = new PtosGeolocation(
      ptosGeoFromData.north,
      ptosGeoFromData.south,
      ptosGeoFromData.east,
      ptosGeoFromData.west
    );

    this.cityFound = new City(
      this.dataFound.name,
      "",
      this.dataFound.lng,
      this.dataFound.lat,
      this.ptosGeoOfCity
    );

    console.log(this.cityFound);

    this.getTemperatureForThisCity();
    this.printGoogleMap();
  }

  printGoogleMap(){

  }

  getTemperatureForThisCity(){
    this._citiesServices.getTemperature(this.cityFound.ptosGeolocation).subscribe(
      result => {
        if(result['weatherObservations'].length != 0){
          this.stationDataFound = result['weatherObservations'][0];
          this.parseStationData();
        } else {
          console.log("No hay datos para esta ciudad");
        }
      }, error => {
        this.errorMessage = <any>error;
        if(this.errorMessage !== null){
          console.log(this.errorMessage);
        }
      });
  }

  parseStationData(){
    this.stationFounded = new StationTemperature(
      this.stationDataFound.stationName,
      this.stationDataFound.temperature,
      this.stationDataFound.humidity,
      this.stationDataFound.windSpeed,
      this.stationDataFound.clouds,
      this.stationDataFound.datetime
    );

    console.log(this.stationFounded);
  }
}

export class City {
  name: string;
  temperature: string;
  longitude: string;
  latitude: string;
  ptosGeolocation: PtosGeolocation;

  constructor(name: string,
              temperature: string,
              longitude: string,
              latitude: string,
              ptosGeolocation: PtosGeolocation){
    this.name = name;
    this.temperature = temperature;
    this.longitude = longitude;
    this.latitude = latitude;
    this.ptosGeolocation = ptosGeolocation;
  };
}

export class PtosGeolocation{
  north: string;
  south: string;
  east: string;
  west: string;

  constructor(north: string,
              south: string,
              east: string,
              west: string){
    this.north = north;
    this.south = south;
    this.east = east;
    this.west = west;
  };
}

export class StationTemperature{
  name: string;
  temperature: string;
  humidity: string;
  windSpeed: string;
  clouds: string;
  dateTime: Date;

  constructor(name: string,
              temperature: string,
              humidity: string,
              windSpeed: string,
              clouds: string,
              dateTime: Date){
    this.name = name;
    this.temperature = temperature;
    this.humidity = humidity;
    this.windSpeed = windSpeed;
    this.clouds = clouds;
    this.dateTime = dateTime;
  };
}
