import { Component, OnInit } from '@angular/core';

import { CategoryService } from '../../services/category.service';
import { AuthService } from '../../services/auth.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  categoryList: Array<Category> = new Array<Category>();
  loggedUsername: string;

  constructor(private categoryService: CategoryService,
              private authService: AuthService) { }

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

    //. . . . . . . . . . . . . . .

    if(localStorage.getItem('username') !== ''){
      this.loggedUsername = localStorage.getItem('username');
    }else{
      this.loggedUsername = '';
    }
  }

  //----------------------------------------------------------------------------
  logoutUser(){
    this.loggedUsername = null;
    localStorage.setItem('username', '');
    localStorage.setItem('token', '');
    this.authService.isLogged = false;  //not used
    //window.location.reload();
  }
}
