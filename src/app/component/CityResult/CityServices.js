"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var CityServices = (function () {
    function CityServices(_http) {
        this._http = _http;
    }
    CityServices.prototype.getCity = function (thisCity) {
        return this._http.get("http://api.geonames.org/searchJSON?q=" + thisCity
            + "&maxRows=20&startRow=0&lang=es&isNameRequired=true&style=FULL&username=ilgeonamessample")
            .map(function (res) { return res.json(); });
    };
    CityServices.prototype.getTemperature = function (thatPtos) {
        return this._http.get("http://api.geonames.org/weatherJSON?north=" + thatPtos.north
            + "&south=" + thatPtos.south
            + "&east=" + thatPtos.east
            + "&west=" + thatPtos.west
            + "&username=ilgeonamessample").map(function (res) { return res.json(); });
    };
    return CityServices;
}());
CityServices = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], CityServices);
exports.CityServices = CityServices;
//# sourceMappingURL=CityServices.js.map