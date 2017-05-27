import { Injectable } from '@angular/core';

import { Http, Response, Headers } from '@angular/http';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';

import { PtosGeolocation } from './city.result.component';

@Injectable()
export class CityServices {
  constructor(private _http: Http){ }

  getCity(thisCity: string, user:  string){
    var response:Observable<any>;
    response = this._http.get("http://api.geonames.org/searchJSON?q=" + thisCity
            + "&maxRows=20&startRow=0&lang=es&isNameRequired=true&style=FULL&username=" + user)
            .map(res => res.json());
    return response;
  }

  getTemperature(thatPtos: PtosGeolocation, user: string){
    var response:Observable<any>;

    response = this._http.get("http://api.geonames.org/weatherJSON?north=" + thatPtos.north
            + "&south=" + thatPtos.south
            + "&east=" + thatPtos.east
            + "&west=" + thatPtos.west
            + "&username=" + user).map(res => res.json());
    return response;
  }
}
