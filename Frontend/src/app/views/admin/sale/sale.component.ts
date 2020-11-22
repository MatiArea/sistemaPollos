import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  sales = [{
    number:2,
    date:'20-11-2020',
    client:{
      name:'Pepe',
    },
    total:10,
    payment:10
  }]
  constructor() { }

  ngOnInit(): void {
  }

}
