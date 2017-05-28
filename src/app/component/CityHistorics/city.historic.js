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
var CityHistoricAppComponent = (function () {
    function CityHistoricAppComponent() {
        this.showCitySelected = false;
        this.showCitySaved = true;
        this.cityResultSearch = JSON.parse(localStorage.getItem('cities'));
    }
    CityHistoricAppComponent.prototype.showCityWhenUserClick = function (city) {
        this.cityToShow = city;
        this.showCitySelected = true;
        this.showCitySaved = false;
    };
    CityHistoricAppComponent.prototype.showListCities = function () {
        this.showCitySelected = false;
        this.showCitySaved = true;
    };
    return CityHistoricAppComponent;
}());
CityHistoricAppComponent = __decorate([
    core_1.Component({
        selector: 'city-historics-search',
        templateUrl: './city.historic.html',
    }),
    __metadata("design:paramtypes", [])
], CityHistoricAppComponent);
exports.CityHistoricAppComponent = CityHistoricAppComponent;
//# sourceMappingURL=city.historic.js.map