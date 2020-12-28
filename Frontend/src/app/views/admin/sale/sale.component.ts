import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Sale } from '../../../models/sale.model';
import { SaleView } from '../../../models/saleView.model';
import { ClientService } from '../../../services/client.service';
import { ProductService } from '../../../services/product.service';
import { SaleService } from '../../../services/sale.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  sale: Sale
  sales: any
  products: any
  clients: any
  indexProductSelect: number
  quantity: number
  items: any
  id_client: number
  saleView: SaleView
  cargandoCreateSale: boolean

  constructor(private saleService: SaleService, private router: Router, private productService: ProductService, private clientService: ClientService, private toastr: ToastrService) {
    this.sale = new Sale()
    this.saleView = new SaleView()
  }


  @ViewChild('viewSaleModal', { static: false }) public viewSaleModal: ModalDirective;
  @ViewChild('newSaleModal', { static: false }) public newSaleModal: ModalDirective;

  ngOnInit(): void {
    this.getAllSales()
  }

  getAllSales() {
    this.sales = []
    this.saleService.getAllsales().subscribe(sales => {
      this.sales = sales['sales']
    })
  }

  getAllProducts() {
    this.products = []
    this.productService.getAllProducts().subscribe(products => {
      this.products = products['products']
    })
  }

  getAllClients() {
    this.clients = []
    this.clientService.getAllClients().subscribe(clients => {
      this.clients = clients['clients']
    })
  }

  getOneSale(idSale: number) {
    this.saleView.items = []
    this.saleService.getOneSale(idSale).subscribe(sale => {
      this.saleView.number = sale['sale'].number
      this.saleView.date = sale['sale'].date.split('T')[0]
      this.saleView.name_client = sale['sale'].client.name
      this.saleView.items = sale['sale'].products
      this.saleView.total = sale['sale'].total
      this.saleView.payment = sale['sale'].payment

      this.viewSaleModal.show()
    })
  }

  openNewSaleModal() {
    this.getAllClients()
    this.getAllProducts()
    this.items = []
    this.sale = new Sale()
    this.sale.total = 0
    this.newSaleModal.show()
  }

  productSelected(index: number) {
    this.indexProductSelect = index
  }

  clientSelected(idClient: number) {
    this.sale.id_client = idClient
  }

  addItem(form: any) {
    if (this.products[this.indexProductSelect].stock < this.quantity) {
      this.toastr.error('No hay stock suficiente', 'Error!', {
        closeButton: true,
        progressBar: true
      });
      form.reset()
    } else {
      if (this.items.length === 0) {
        const item = {
          product: this.products[this.indexProductSelect],
          quantity: this.quantity
        }
        this.items.push(item)
        this.products[this.indexProductSelect].stock -= this.quantity
        this.sale.total += item.quantity * item.product.sale_price
      }
      else {
        this.items.forEach(element => {
          if (element.product.id_product === this.products[this.indexProductSelect].id_product) {
            element.quantity += this.quantity
          }
          else {
            const item = {
              product: this.products[this.indexProductSelect],
              quantity: this.quantity
            }
            this.items.push(item)
          }
          this.products[this.indexProductSelect].stock -= this.quantity
          this.sale.total += element.quantity * element.product.sale_price
        });
      }
      form.reset()
    }
  }

  deleteItem(item: any) {
    this.items.pop(item)
    this.sale.total -= item.quantity * item.product.sale_price
  }

  createSale(createForm: any) {
    this.cargandoCreateSale = true
    let newSale = {
      number: this.sale.number,
      date: this.sale.date,
      id_client: this.sale.id_client,
      total: this.sale.total,
      payment: this.sale.payment,
      items: this.items
    }
    this.saleService.createSale(newSale).subscribe(data => {
      this.cargandoCreateSale = false
      this.toastr.success('Venta creada con exito', 'Exito!', {
        closeButton: true,
        progressBar: true
      });
      this.newSaleModal.hide();
      createForm.reset();
      this.getAllSales();

    }, (error) => {
      if (error) {
        this.cargandoCreateSale = false
        if (error.code === 403) {
          this.router.navigate(['login']);
        }
        this.toastr.error('No se pude crear la venta', 'Error!', {
          closeButton: true,
          progressBar: true
        });
      }
    })
  }

  daleteSale(idSale: number) {
    this.saleService.deleteSale(idSale).subscribe(
      data => {
        this.toastr.success('Venta eliminada con exito', 'Exito!', {
          closeButton: true,
          progressBar: true
        });
        this.getAllSales();

      }, (error) => {
        if (error) {
          if (error.code === 403) {
            this.router.navigate(['login']);
          }
          this.toastr.error('No se pude eliminar la venta', 'Error!', {
            closeButton: true,
            progressBar: true
          });
        }
      })
  }

}