import { Article } from './article.model';

export class Category{

  public name: string;
  public slug: string;
  public description: string;
  public image: string;
  public articles_count:any;
  public category_articles: Article[];

  constructor(){}
}
