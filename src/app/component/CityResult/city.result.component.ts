import { Component, Input } from '@angular/core';
import { CityServices } from './CityServices';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'city-result',
  templateUrl: './city.result.component.html',
  providers: [CityServices]
})

//"https://www.google.com/maps/embed/v1/search?q=" + this.citySelected.name + "&key=AIzaSyBnqUQM3sEzfph4qdGIMM6PSenBgPC3IPY"

export class CityResultComponent {
  @Input() citySelected: string;

  public cityFound: City;
  public ptosGeoOfCity: PtosGeolocation;
  public citiesServices: CityServices;
  public stationFounded: StationTemperature;
  public stationDataFound: any;
  public dataFound: any;
  public errorMessage: any;
  public users: string[] = ["ilgeonamessample", "demo"];
  public temperatureFromStations: number;
  public arrTemperature: any;

  constructor(private _citiesServices: CityServices, public sanitizer: DomSanitizer){
    this.citiesServices = _citiesServices;
    this.sanitizer = sanitizer;
  }

  ngAfterViewInit(){

  }

  ngOnChanges(){
    this.getCityFromName();
  }

  getCityFromName(){
    console.log(this.citySelected);

    this._citiesServices.getCity(this.citySelected, this.users[0]).subscribe(
      result => {
        if(!result['status']){
          console.log(result);
          this.dataFound = result['geonames'][0];
          this.parseDataFound();
        } else {
          this._citiesServices.getCity(this.citySelected, this.users[1]).subscribe(
            result => {
              console.log(result);
              if(result['totalResultsCount'] > 0){
                this.dataFound = result['geonames'][0];
                this.parseDataFound();
              }
            }, error => {
              this.errorMessage = <any>error;
              if(this.errorMessage !== null){
                console.log(this.errorMessage);
              }
            });
        }
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

    this.getTemperatureForThisCity();
    this.printGoogleMap();
    this.citySelected = this.dataFound.name;
  }

  printGoogleMap(){
    var srcToMaps = "https://www.google.com/maps/embed/v1/search?q=" + this.citySelected + "&key=AIzaSyBnqUQM3sEzfph4qdGIMM6PSenBgPC3IPY";
    return this.sanitizer.bypassSecurityTrustResourceUrl(srcToMaps);
  }

  getClassProgressBar(temperature: string){
    var numTemp = parseInt(temperature);
    var typeProgressBar: string;
    console.log(numTemp);

    if(numTemp >= 30 && numTemp < 35){
      typeProgressBar = "progress-bar progress-bar-danger width80";
    } else if(numTemp >= 25 && numTemp < 30){
      typeProgressBar = "progress-bar progress-bar-warning width60";
    } else if(numTemp >= 20 && numTemp < 25){
      typeProgressBar = "progress-bar progress-bar-success width40";
    } else if(numTemp < 20){
      typeProgressBar = "progress-bar progress-bar-info width20";
    }
    console.log(typeProgressBar);
    return typeProgressBar;
  }

  getTemperatureForThisCity(){
    this._citiesServices.getTemperature(this.cityFound.ptosGeolocation, this.users[0]).subscribe(
      result => {
        console.log(result);
        if(result['status']){
          this._citiesServices.getTemperature(this.cityFound.ptosGeolocation, this.users[1]).subscribe(
            result => {
              if(!result['status']){
                if(result['weatherObservations'].length != 0){
                  this.arrTemperature = result['weatherObservations'];
                  this.stationDataFound = result['weatherObservations'][0];
                  this.parseStationData();
                } else {
                  console.log("No hay datos para esta ciudad");
                  this.citySelected = null;
                  this.stationFounded = null;
                }
              }
            }, error => {
              this.errorMessage = <any>error;
              if(this.errorMessage !== null){
                console.log(this.errorMessage);
              }
            });
        } else {
          if(result['weatherObservations'].length != 0){
            this.arrTemperature = result['weatherObservations'];

            this.stationDataFound = result['weatherObservations'][0];
            this.parseStationData();
          } else {
            console.log("No hay datos para esta ciudad");
            this.citySelected = null;
            this.stationFounded = null;
          }
        }
      }, error => {
        this.errorMessage = <any>error;
        if(this.errorMessage !== null){
          console.log(this.errorMessage);
        }
      });
      //this.temperatureFromStations = arrTemperature;
  }

  parseStationData(){
    var windSpeedParse = parseInt(this.stationDataFound.windSpeed);
    var arrAux: number[] = [];
    var cont: number = 0;

    for(var i = 0; i < this.arrTemperature.length; i++){
      var station: any = this.arrTemperature[i];
      var tempAux = parseInt(station.temperature);
      cont += tempAux;
    }

    console.log(cont);

    cont = cont/this.arrTemperature.length;
    this.temperatureFromStations = cont;

    console.log(this.temperatureFromStations);

    this.stationFounded = new StationTemperature(
      this.stationDataFound.stationName,
      this.temperatureFromStations.toString(),
      this.stationDataFound.humidity,
      windSpeedParse,
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
  windSpeed: number;
  clouds: string;
  dateTime: Date;

  constructor(name: string,
              temperature: string,
              humidity: string,
              windSpeed: number,
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
