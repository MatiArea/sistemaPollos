import { Component, OnInit, ViewChild } from '@angular/core';
import { Form } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: any;
  productToEdit: any;
  products: any;

  constructor(private productoService:ProductService, private toastr:ToastrService) { 
    this.product = new Product()
    this.productToEdit = new Product()
  }

  @ViewChild('editProductModal', {static: false}) public editProductModal: ModalDirective;
  @ViewChild('newProductModal', {static: false}) public newProductModal: ModalDirective;



  ngOnInit(): void {
    this.getAllProducts();
  }
  
  getAllProducts(){
    this.productoService.getAllProducts().subscribe(products => {
      this.products = products['products']

    });
  }

  createProduct(createForm:any){
    this.productoService.createProduct(this.product).subscribe( data => {
      
      this.toastr.success('Producto creado con exito', 'Exito!', {
        closeButton: true,
        progressBar: true
      });
      this.newProductModal.hide();      
      createForm.reset();
      this.product = new Product();
      this.getAllProducts();

    },(error)=>{
      if(error){
        this.toastr.error('No se pude crear el producto', 'Error!', {
          closeButton: true,
          progressBar: true
        });
      }
    })
  }

  openEditProduct(productEdit: Product){
    this.productoService.getOneProduct(productEdit.id_product).subscribe( productToEdit =>{
        this.productToEdit = productToEdit['product'];
    })
    this.editProductModal.show();
  }

  editProduct(editForm:any){
    this.productoService.editProduct(this.productToEdit).subscribe( data => {
      
      this.toastr.success('Producto actualizado con exito', 'Exito!', {
        closeButton: true,
        progressBar: true
      });
      this.editProductModal.hide();      
      editForm.reset();
      this.productToEdit = new Product();
      this.getAllProducts();

    },(error)=>{
      if(error){
        this.toastr.error('No se pude actualizar el producto', 'Error!', {
          closeButton: true,
          progressBar: true
        });
      }
    })
  }

  deleteProduct(productDelete: Product) {
    this.productoService.deleteProduct(productDelete.id_product).subscribe( data => {
      this.toastr.success('Producto eliminado con exito', 'Exito!', {
        closeButton: true,
        progressBar: true
      });
      this.getAllProducts();
    }, (error) => {
      if(error){
        this.toastr.error('No se pude eliminar el producto', 'Error!', {
          closeButton: true,
          progressBar: true
        });
      }
    })
  }


}
