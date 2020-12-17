import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from '../../../services/client.service';
import { ProductService } from '../../../services/product.service';
import { SaleService } from '../../../services/sale.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  sales:any
  products: any
  clients: any
  indexProductSelect: number


  constructor(private saleService: SaleService, private productService: ProductService, private clientService: ClientService, private toastr: ToastrService) { }


  @ViewChild('editProductModal', {static: false}) public editProductModal: ModalDirective;
  @ViewChild('newSaleModal', {static: false}) public newSaleModal: ModalDirective;

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

  productSelected(index:number){
    this.indexProductSelect = index
  }

  openNewSaleModal(){
    this.getAllClients()
    this.getAllProducts()
    this.newSaleModal.show()
  }

}
