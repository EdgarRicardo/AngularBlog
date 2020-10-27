export class Post{
  constructor(
    public id: number,
    public user_id: number,
    public category_id: number,
    public title: string,
    public content: string,
    public image: string,
    public uname: string = null, //user name
    public usurname: string = null, // user surname
    public cname: string = null, //category name
    public created_at: string = null
    ){}
}
