import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../services/report.service';
import { each } from 'async';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  
  totalSales:number
  totalExpenses:number
  totalPurchases:number
  totalMovements:number
  ganancia:number

  constructor(private reportService:ReportService) { 
    this.totalSales = 0
    this.totalExpenses = 0
    this.totalPurchases = 0
    this.totalMovements = 0
    this.ganancia = 0
  }

  ngOnInit(): void {
    this.generateReport()
  }

  generateReport(){
    this.reportService.dayReport().subscribe(data=>{
      console.log(data)
      each(data['sales'],(sale) => {
        this.totalSales += sale.payment
      });
      each(data['movements'],(movement) => {
        this.totalMovements += movement.amount
      });
      each(data['purchases'],(purchase) => {
        this.totalPurchases += purchase.price * purchase.quantity
      });
      each(data['expenses'],(expense) => {
        this.totalExpenses += expense.amount
      });
      this.ganancia = this.totalSales + this.totalMovements - this.totalExpenses - this.totalPurchases
    })
  }

}
