import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NouisliderModule } from 'ng2-nouislider';
import { FilterServiceService } from './filter-service.service'
import { locateHostElement } from '@angular/core/src/render3/instructions';
import * as _ from "lodash";
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private http: Http,
    private filterService: FilterServiceService) { }
  rawData: any;
  typesJson: any;
  min: any;
  max: any;
  filters = [];
  filteredData = [];
  centralArray = [];
  typesArray = [];
  ngOnInit() {
    this.getdata();
  }
  getdata() {
    this.http.get("./assets/products.json").map((response) => response.json()).
      subscribe((data) => {
        this.rawData = data.products;
        this.typesJson = data.attributes;
        this.filteredData = this.rawData;
        for (let x in this.typesJson) {
          this.typesArray.push(x);
        }
      })
  }
  priceFilter(min, max) {
    if (min !== null && min !== undefined && max !== null && min !== undefined) {
      this.centralArray = _.filter(this.rawData, function (o) {
        return o.product_price > min && o.product_price < max
      });
    } else {
      this.centralArray = this.rawData;
    }
  }

  applyFilter(type?, filter?) {
    console.log(type,filter);
    if(type !== undefined && filter !== undefined){
      let obj = {
        type: type,
        value: filter.Value
      }
      // this.priceFilter(this.min, this.max);
      if (filter.selected == true) {
        if (_.findIndex(this.filters, function (e) { return e.value == filter.Value; }) == -1) {
          this.filters.push(obj)
        }
      } else {
        _.pullAllWith(this.filters, [obj], _.isEqual);
      }
    }
    this.priceFilter(this.min, this.max);

    
    // this.filteredData = this.filterService.filterData(this.rawData, this.filters)
    this.filteredData = this.filterService.filterData(this.centralArray, this.filters)

  }
}
