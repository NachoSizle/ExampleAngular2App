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
var CityServices_1 = require("./CityServices");
var CityResultComponent = (function () {
    function CityResultComponent(_citiesServices, rd) {
        this._citiesServices = _citiesServices;
        this.rd = rd;
        this.citiesServices = _citiesServices;
    }
    CityResultComponent.prototype.ngAfterViewInit = function () {
        console.log(this.rd);
        console.log(this.iframe);
    };
    CityResultComponent.prototype.ngOnChanges = function () {
        this.getCityFromName();
    };
    CityResultComponent.prototype.getCityFromName = function () {
        var _this = this;
        console.log(this.citySelected);
        this._citiesServices.getCity(this.citySelected).subscribe(function (result) {
            _this.dataFound = result['geonames'][0];
            _this.parseDataFound();
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage !== null) {
                console.log(_this.errorMessage);
            }
        });
    };
    CityResultComponent.prototype.parseDataFound = function () {
        console.log(this.dataFound);
        var ptosGeoFromData = this.dataFound.bbox;
        this.ptosGeoOfCity = new PtosGeolocation(ptosGeoFromData.north, ptosGeoFromData.south, ptosGeoFromData.east, ptosGeoFromData.west);
        this.cityFound = new City(this.dataFound.name, "", this.dataFound.lng, this.dataFound.lat, this.ptosGeoOfCity);
        console.log(this.cityFound);
        this.getTemperatureForThisCity();
        this.printGoogleMap();
    };
    CityResultComponent.prototype.printGoogleMap = function () {
    };
    CityResultComponent.prototype.getTemperatureForThisCity = function () {
        var _this = this;
        this._citiesServices.getTemperature(this.cityFound.ptosGeolocation).subscribe(function (result) {
            if (result['weatherObservations'].length != 0) {
                _this.stationDataFound = result['weatherObservations'][0];
                _this.parseStationData();
            }
            else {
                console.log("No hay datos para esta ciudad");
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage !== null) {
                console.log(_this.errorMessage);
            }
        });
    };
    CityResultComponent.prototype.parseStationData = function () {
        this.stationFounded = new StationTemperature(this.stationDataFound.stationName, this.stationDataFound.temperature, this.stationDataFound.humidity, this.stationDataFound.windSpeed, this.stationDataFound.clouds, this.stationDataFound.datetime);
        console.log(this.stationFounded);
    };
    return CityResultComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CityResultComponent.prototype, "citySelected", void 0);
__decorate([
    core_1.ViewChild('iframeMapsContainer'),
    __metadata("design:type", core_1.ElementRef)
], CityResultComponent.prototype, "iframe", void 0);
CityResultComponent = __decorate([
    core_1.Component({
        selector: 'city-result',
        templateUrl: './city.result.component.html',
        providers: [CityServices_1.CityServices]
    }),
    __metadata("design:paramtypes", [CityServices_1.CityServices, core_1.Renderer2])
], CityResultComponent);
exports.CityResultComponent = CityResultComponent;
var City = (function () {
    function City(name, temperature, longitude, latitude, ptosGeolocation) {
        this.name = name;
        this.temperature = temperature;
        this.longitude = longitude;
        this.latitude = latitude;
        this.ptosGeolocation = ptosGeolocation;
    }
    ;
    return City;
}());
exports.City = City;
var PtosGeolocation = (function () {
    function PtosGeolocation(north, south, east, west) {
        this.north = north;
        this.south = south;
        this.east = east;
        this.west = west;
    }
    ;
    return PtosGeolocation;
}());
exports.PtosGeolocation = PtosGeolocation;
var StationTemperature = (function () {
    function StationTemperature(name, temperature, humidity, windSpeed, clouds, dateTime) {
        this.name = name;
        this.temperature = temperature;
        this.humidity = humidity;
        this.windSpeed = windSpeed;
        this.clouds = clouds;
        this.dateTime = dateTime;
    }
    ;
    return StationTemperature;
}());
exports.StationTemperature = StationTemperature;
//# sourceMappingURL=city.result.component.js.map