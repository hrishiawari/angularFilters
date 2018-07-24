import { Injectable } from '@angular/core';
import * as _ from "lodash";

@Injectable({
  providedIn: 'root'
})

export class FilterServiceService {
  constructor() { }
  newArray: any;
  logicArray = [];
  filterData(raw, filters) {
    this.newArray = raw
    if (filters.length > 0) {
      filters.forEach(property => {
        var type = property.type;
        var value = property.value;
        let obj = {
          [type]: value
        }
        this.logicArray.push(type);
        if (this.countInArray(this.logicArray, type) == 1) {
          this.andOperation(obj);
        } else {
          this.orOperation(raw, obj);
        }
      });
      this.logicArray = [];
    } else {
      this.newArray = raw;
    }
    return this.newArray;
  }
  andOperation(obj) {
    this.newArray = _.filter(this.newArray, obj)
  }
  orOperation(raw, obj) {
    let data = _.filter(raw, obj);
    data.forEach(element => {
      this.newArray.push(element);
    });
  }
  countInArray(array, what) {
    return array.filter(item => item == what).length;
  }
}
