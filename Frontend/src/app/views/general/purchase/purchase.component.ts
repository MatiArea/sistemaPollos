import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Purchase } from '../../../models/purchase.model';
import { ProductService } from '../../../services/product.service';
import { PurchaseService } from '../../../services/purchase.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  constructor(private purchaseService: PurchaseService, private router: Router, private productService: ProductService, private toastr: ToastrService) {
    this.purchase = new Purchase()
  }

  products: any
  idProductSelect: any
  items: any
  purchase: Purchase
  total: number
  purchases: any
  cargandoCreatePurchase:boolean

  @ViewChild('editPurchaseModal', { static: false }) public editPurchaseModal: ModalDirective;
  @ViewChild('newPurchaseModal', { static: false }) public newPurchaseModal: ModalDirective;

  ngOnInit(): void {
    this.getAllPurchase()
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data['products']
    })
  }

  getAllPurchase() {
    this.purchases = []
    this.purchaseService.getAllPurchase().subscribe(data => {
      this.purchases = data['purchases']
    })

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
    this.cargandoCreatePurchase = true
    const purchase = {
      date: this.purchase.date,
      number: this.purchase.number,
      price: this.purchase.price,
      quantity: this.purchase.quantity,
      idProduct: this.idProductSelect
    }
    this.purchaseService.createPurchase(purchase).subscribe(data => {
      this.cargandoCreatePurchase = false
      this.toastr.success('Producto creado con exito', 'Exito!', {
        closeButton: true,
        progressBar: true
      });
      this.newPurchaseModal.hide();
      createForm.reset();
      this.getAllPurchase();

    }, (error) => {
      if (error) {
        this.cargandoCreatePurchase = false
        if (error.code === 403) {
          this.router.navigate(['login']);
        }
        this.toastr.error('No se pude crear la compra', 'Error!', {
          closeButton: true,
          progressBar: true
        });
      }
    })
  }

  deletePurchase(idPurchase: number) {
    this.purchaseService.deletePurchase(idPurchase).subscribe(data => {
      this.toastr.success('Compra eliminada con exito', 'Exito!', {
        closeButton: true,
        progressBar: true
      });
      this.getAllPurchase();
    }, (error) => {
      if (error) {
        if (error.code === 403) {
          this.router.navigate(['login']);
        }
        this.toastr.error('No se pude eliminar la compra', 'Error!', {
          closeButton: true,
          progressBar: true
        });
      }
    })
  }

}
