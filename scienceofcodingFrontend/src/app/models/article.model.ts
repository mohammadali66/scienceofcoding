import { Tag } from './tag.model';
import { User } from './user.model';

export class Article{

  public title_english: string;
  public title_farsi: string;
  public abstract_english: string;
  public abstract_farsi: string;
  public content_english: string;
  public content_farsi: string;
  public slug: string;
  public image: string;
  public author: User = new User();
  public updated_date: string;
  public url:string;

  public tags: Tag[];

  constructor(){}
}
