import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private categoryService: CategoryService,
              private authService: AuthService,
              private router: Router) { }

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

  //----------------------------------------------------------------------------
  logoutUser(){
    this.authService.loggedUser = null;
    localStorage.setItem('username', '');
    localStorage.setItem('token', '');
    localStorage.setItem('avatar', '');
    this.router.navigate(['/']);
  }
}
