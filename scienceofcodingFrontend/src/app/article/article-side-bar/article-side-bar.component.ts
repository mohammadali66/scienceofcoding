import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { ArticleService } from '../../services/article.service';
import { CategoryService } from '../../services/category.service';
import { TagService } from '../../services/tag.service';

import { Category } from '../../models/category.model';
import { User } from '../../models/user.model';
import { Article } from '../../models/article.model';
import { Tag } from '../../models/tag.model';

@Component({
  selector: 'app-article-side-bar',
  templateUrl: './article-side-bar.component.html',
  styleUrls: ['./article-side-bar.component.css']
})
export class ArticleSideBarComponent implements OnInit {

  articleList: Array<Article> = new Array<Article>();
  categoryList: Array<Category> = new Array<Category>();
  tagList: Array<Tag> = new Array<Tag>();

  constructor(private articleService: ArticleService,
              private categoryService: CategoryService,
              private tagService: TagService,
              private router: Router) { }

  ngOnInit() {
    this.articleService.getMostViewArticle('3').subscribe(
      (data: any) => {
        for(let art of data){
          let article: Article = new Article();
          article.title_english = art.title_english;
          article.abstract_english = art.abstract_english;
          article.slug = art.slug;
          article.image = art.image;
          article.updated_date = art.updated_datetime;
          article.view_count = art.view_count;

          this.articleList.push(article);
        }
      }
    );
    //............................................
    //category list
    this.categoryService.getCategoryListMenu().subscribe(
      (data: any) => {
        for(const cat of data){
          let category: Category = new Category();
          category.name = cat.name;
          category.slug = cat.slug;
          category.articles_count = cat.articles_count;
          this.categoryList.push(category);
        }
      }
    );

    //.................................................
    //tag list
    this.tagService.getAllTag().subscribe(
      (data: any) => {
        for(const t of data){
          let tag: Tag = new Tag();
          tag.name = t.name;
          tag.slug = t.slug;
          this.tagList.push(tag);
        }
      }
    );
  }

  //----------------------------------------------------------------------------
  searchForm(form: NgForm){
    this.router.navigate(['/search'], {queryParams: {q: form.value.searchstring }});
  }
}
