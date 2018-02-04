import { Component, OnInit } from '@angular/core';

import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  categoryList: Array<Category> = new Array<Category>();

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getCategoryListMenu().subscribe(
      (data:any) => {
        for(const cat of data){
          let category: Category = new Category();
          category.name = cat.name;
          category.slug = cat.slug;
          this.categoryList.push(category);
        }
      }
    );
  }

}
