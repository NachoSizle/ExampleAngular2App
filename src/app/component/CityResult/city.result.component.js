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
var platform_browser_1 = require("@angular/platform-browser");
var CityResultComponent = (function () {
    function CityResultComponent(_citiesServices, sanitizer) {
        this._citiesServices = _citiesServices;
        this.sanitizer = sanitizer;
        this.users = ["ilgeonamessample", "demo"];
        this.citiesServices = _citiesServices;
        this.sanitizer = sanitizer;
    }
    CityResultComponent.prototype.ngAfterViewInit = function () {
    };
    CityResultComponent.prototype.ngOnChanges = function () {
        this.getCityFromName();
    };
    CityResultComponent.prototype.getCityFromName = function () {
        var _this = this;
        console.log(this.citySelected);
        this._citiesServices.getCity(this.citySelected, this.users[0]).subscribe(function (result) {
            if (!result['status']) {
                console.log(result);
                _this.dataFound = result['geonames'][0];
                _this.parseDataFound();
            }
            else {
                _this._citiesServices.getCity(_this.citySelected, _this.users[1]).subscribe(function (result) {
                    console.log(result);
                    if (result['totalResultsCount'] > 0) {
                        _this.dataFound = result['geonames'][0];
                        _this.parseDataFound();
                    }
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage !== null) {
                        console.log(_this.errorMessage);
                    }
                });
            }
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
        this.getTemperatureForThisCity();
        this.printGoogleMap();
        this.citySelected = this.dataFound.name;
    };
    CityResultComponent.prototype.printGoogleMap = function () {
        var srcToMaps = "https://www.google.com/maps/embed/v1/search?q=" + this.citySelected + "&key=AIzaSyBnqUQM3sEzfph4qdGIMM6PSenBgPC3IPY";
        return this.sanitizer.bypassSecurityTrustResourceUrl(srcToMaps);
    };
    CityResultComponent.prototype.getClassProgressBar = function (temperature) {
        var numTemp = parseInt(temperature);
        var typeProgressBar;
        console.log(numTemp);
        if (numTemp >= 30 && numTemp < 35) {
            typeProgressBar = "progress-bar progress-bar-danger width80";
        }
        else if (numTemp >= 25 && numTemp < 30) {
            typeProgressBar = "progress-bar progress-bar-warning width60";
        }
        else if (numTemp >= 20 && numTemp < 25) {
            typeProgressBar = "progress-bar progress-bar-success width40";
        }
        else if (numTemp < 20) {
            typeProgressBar = "progress-bar progress-bar-info width20";
        }
        console.log(typeProgressBar);
        return typeProgressBar;
    };
    CityResultComponent.prototype.getTemperatureForThisCity = function () {
        var _this = this;
        this._citiesServices.getTemperature(this.cityFound.ptosGeolocation, this.users[0]).subscribe(function (result) {
            console.log(result);
            if (result['status']) {
                _this._citiesServices.getTemperature(_this.cityFound.ptosGeolocation, _this.users[1]).subscribe(function (result) {
                    if (!result['status']) {
                        if (result['weatherObservations'].length != 0) {
                            _this.arrTemperature = result['weatherObservations'];
                            _this.stationDataFound = result['weatherObservations'][0];
                            _this.parseStationData();
                        }
                        else {
                            console.log("No hay datos para esta ciudad");
                            _this.citySelected = null;
                            _this.stationFounded = null;
                        }
                    }
                }, function (error) {
                    _this.errorMessage = error;
                    if (_this.errorMessage !== null) {
                        console.log(_this.errorMessage);
                    }
                });
            }
            else {
                if (result['weatherObservations'].length != 0) {
                    _this.arrTemperature = result['weatherObservations'];
                    _this.stationDataFound = result['weatherObservations'][0];
                    _this.parseStationData();
                }
                else {
                    console.log("No hay datos para esta ciudad");
                    _this.citySelected = null;
                    _this.stationFounded = null;
                }
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage !== null) {
                console.log(_this.errorMessage);
            }
        });
        //this.temperatureFromStations = arrTemperature;
    };
    CityResultComponent.prototype.parseStationData = function () {
        var windSpeedParse = parseInt(this.stationDataFound.windSpeed);
        var arrAux = [];
        var cont = 0;
        for (var i = 0; i < this.arrTemperature.length; i++) {
            var station = this.arrTemperature[i];
            var tempAux = parseInt(station.temperature);
            cont += tempAux;
        }
        console.log(cont);
        cont = cont / this.arrTemperature.length;
        this.temperatureFromStations = cont;
        console.log(this.temperatureFromStations);
        this.stationFounded = new StationTemperature(this.stationDataFound.stationName, this.temperatureFromStations.toString(), this.stationDataFound.humidity, windSpeedParse, this.stationDataFound.clouds, this.stationDataFound.datetime);
        console.log(this.stationFounded);
    };
    return CityResultComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CityResultComponent.prototype, "citySelected", void 0);
CityResultComponent = __decorate([
    core_1.Component({
        selector: 'city-result',
        templateUrl: './city.result.component.html',
        providers: [CityServices_1.CityServices]
    }),
    __metadata("design:paramtypes", [CityServices_1.CityServices, platform_browser_1.DomSanitizer])
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