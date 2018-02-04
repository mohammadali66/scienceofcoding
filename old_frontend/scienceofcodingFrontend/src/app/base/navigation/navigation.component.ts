import { Component, OnInit } from '@angular/core';

import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

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
