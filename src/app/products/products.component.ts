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
    this.filteredData = _.filter(this.rawData, function(o){
      return o.product_price > 30 && o.product_price <200 
    });
  }

  applyFilter(type, filter) {
    let obj = {
      type: type,
      value: filter.Value
    }
    if (filter.selected == true) {
      if (_.findIndex(this.filters, function (e) { return e.value == filter.Value; }) == -1) {
        this.filters.push(obj)
      }
    } else {
      _.pullAllWith(this.filters, [obj], _.isEqual);
    }
    this.filteredData = this.filterService.filterData(this.rawData, this.filters)
    // this.filteredData = this.filterService.filterData(this.filteredData, this.filters)

  }
}
