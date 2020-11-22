import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: Product;
  products: any;

  constructor(private productoService:ProductService) { 
    
    
  }

  ngOnInit(): void {
    this.product = new Product();
    this.getAllProducts();
  }
  
  getAllProducts(){
    this.productoService.getAllProducts().subscribe(products => {
      this.products = products['products']
    });
  }

}
