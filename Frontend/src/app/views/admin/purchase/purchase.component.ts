import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../services/product.service';
import { PurchaseService } from '../../../services/purchase.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  constructor(private purchaseService: PurchaseService, private productService: ProductService, private toastr: ToastrService) { }

  products: any
  idProductSelect: any
  items: any
  cantidad: number
  precio: number
  total: number
  number:any
  date:any

  @ViewChild('editPurchaseModal', { static: false }) public editPurchaseModal: ModalDirective;
  @ViewChild('newPurchaseModal', { static: false }) public newPurchaseModal: ModalDirective;

  ngOnInit(): void {
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data['products']
    })
  }

  getAllPurchase(){
    console.log('Hola')
  }

  opentNewPurchaseModal() {
    this.idProductSelect = 0
    this.getAllProducts()
    this.newPurchaseModal.show()
  }

  productSelected(id_product: number) {
    this.idProductSelect = id_product
  }

  createPurchase(createForm: any) {
    const purchase = {
      date:this.date,
      number:this.number,
      idProduct: this.idProductSelect
    }
    this.purchaseService.createPurchase(purchase).subscribe(data => {
      this.toastr.success('Producto creado con exito', 'Exito!', {
        closeButton: true,
        progressBar: true
      });
      this.newPurchaseModal.hide();      
      createForm.reset();
      this.getAllPurchase();

    },(error)=>{
      if(error){
        this.toastr.error('No se pude crear la compra', 'Error!', {
          closeButton: true,
          progressBar: true
        });
      }
    })
  }

  getAllPurchase(){
    
  }
}
