import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Expense } from '../../../models/expense.model';
import { ExpenseService } from '../../../services/expense.service';
import localeIt from '@angular/common/locales/it'
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeIt, 'it');

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  expenses: any
  expense: Expense
  viewExpense: Expense
  typeSelect: number
  viewType: number
  cargandoCreateExpense: boolean
  page:number

  types = ["Varios", "Combustible"]

  @ViewChild('viewExpenseModal', { static: false }) public viewExpenseModal: ModalDirective;
  @ViewChild('newExpenseModal', { static: false }) public newExpenseModal: ModalDirective;

  constructor(private expenseService: ExpenseService, private router: Router, private toastr: ToastrService) {
    this.expense = new Expense()
    this.viewExpense = new Expense()
  }

  ngOnInit(): void {
    this.page = 0
    this.getAllExpense()
  }

  typeSelected(type: any) {
    this.typeSelect = type - 1
  }

  changePage(numPage:number){
    if(numPage >= 0){
      this.page = numPage
      this.getAllExpense()
    }
  }

  getAllExpense() {
    this.expenses = []
    this.expenseService.getAllExpenses(this.page).subscribe(expenses => {
      this.expenses = expenses['expenses']
    })
  }

  getOneExpense(idExpense: number) {
    this.viewExpense = new Expense()
  }

  openViewModal(expense: Expense) {
    this.viewType = 0
    if (expense.type === "Varios") {
      this.viewType = 1
    } else {
      this.viewType = 2
    }
    this.viewExpense = expense
    this.viewExpenseModal.show()
  }

  openNewExpense(){
    this.expense = new Expense()
    this.expense.date = new Date().toISOString().split('T')[0]
    this.newExpenseModal.show()
  }

  createExpense(createForm: any) {
    this.cargandoCreateExpense = true
    const newExpense = {
      date: this.expense.date,
      type: this.types[this.typeSelect],
      amount: this.expense.amount,
      description: this.expense.description
    }
    this.expenseService.createExpense(newExpense).subscribe(data => {
      this.cargandoCreateExpense = false
      this.toastr.success('Gasto cargado con exito', 'Exito!', {
        closeButton: true,
        progressBar: true
      });
      createForm.reset();
      this.newExpenseModal.hide();
      this.getAllExpense();

    }, (error) => {
      if (error) {
        this.cargandoCreateExpense = false
        if (error.code === 403) {
          this.router.navigate(['login']);
        }
        this.toastr.error('No se pude cargar el gasto', 'Error!', {
          closeButton: true,
          progressBar: true
        });
      }
    })
  }

  deleteExpense(idExpense: number) {
    this.expenseService.deleteExpense(idExpense).subscribe(data => {
      this.toastr.success('Gasto eliminado con exito', 'Exito!', {
        closeButton: true,
        progressBar: true
      });
      this.getAllExpense();
    }, (error) => {
      if (error) {
        if (error.code === 403) {
          this.router.navigate(['login']);
        }
        this.toastr.error('No se pude eliminar el gasto', 'Error!', {
          closeButton: true,
          progressBar: true
        });
      }
    })
  }

}
