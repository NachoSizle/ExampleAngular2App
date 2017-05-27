import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { HttpModule, JsonpModule } from '@angular/http';

import { NavBarComponent }  from './component/Navbar/navbar.component';
import { CityListAppComponent }  from './component/City/city.list.component';
import { CityResultComponent }  from './component/CityResult/city.result.component';


@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule ],
  declarations: [ CityListAppComponent, NavBarComponent, CityResultComponent ],
  bootstrap:    [ CityListAppComponent, NavBarComponent ]
})
export class AppModule { }
