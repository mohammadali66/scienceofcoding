import { User } from './user.model';

export class Comment{
  public id: string;
  public user: User;
  public article: string;
  public parentId: string;
  public content: string;
  public updated_datetime: string;
  public sub_comment_list: Array<Comment>;

  constructor(){}
}
