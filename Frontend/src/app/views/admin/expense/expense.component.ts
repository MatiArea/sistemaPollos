import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Expense } from '../../../models/expense.model';
import { ExpenseService } from '../../../services/expense.service';

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
  cargandoExpense:boolean

  types = ["Varios", "Combustible"]

  @ViewChild('viewExpenseModal', { static: false }) public viewExpenseModal: ModalDirective;
  @ViewChild('newExpenseModal', { static: false }) public newExpenseModal: ModalDirective;

  constructor(private expenseService: ExpenseService, private router: Router, private toastr: ToastrService) {
    this.expense = new Expense()
    this.viewExpense = new Expense()
  }

  ngOnInit(): void {
    this.getAllExpense()
  }

  typeSelected(type: any) {
    this.typeSelect = type - 1
  }

  getAllExpense() {
    this.expenses = []
    this.expenseService.getAllExpenses().subscribe(expenses => {
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

  createExpense(createForm: any) {
    this.cargandoExpense = true
    const newExpense = {
      date: this.expense.date,
      type: this.types[this.typeSelect],
      amount: this.expense.amount,
      description: this.expense.description
    }
    this.expenseService.createExpense(newExpense).subscribe(data => {
      this.cargandoExpense = false
      this.toastr.success('Gasto cargado con exito', 'Exito!', {
        closeButton: true,
        progressBar: true
      });
      createForm.reset();
      this.newExpenseModal.hide();
      this.getAllExpense();

    }, (error) => {
      if (error) {
        this.cargandoExpense = false
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
