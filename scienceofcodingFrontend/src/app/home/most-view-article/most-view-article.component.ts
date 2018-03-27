import { Component, OnInit } from '@angular/core';

import { ArticleService } from '../../services/article.service';
import { Category } from '../../models/category.model';
import { User } from '../../models/user.model';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-most-view-article',
  templateUrl: './most-view-article.component.html',
  styleUrls: ['./most-view-article.component.css']
})
export class MostViewArticleComponent implements OnInit {

  articleList: Array<Article> = new Array<Article>();

  constructor(private articleService: ArticleService) { }

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

          let author: User = new User();
          author.avatar = art.author.avatar;
          author.slug = art.author.slug;
          author.username = art.author.username;
          article.author = author

          let category: Category = new Category();
          category.name = art.category.name;
          category.slug = art.category.slug;
          article.category = category;

          this.articleList.push(article);
        }
      }
    );
  }

}
