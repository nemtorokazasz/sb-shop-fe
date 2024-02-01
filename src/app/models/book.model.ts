export class Product {
  id: number | undefined;
  title: string = "";
  category: string = "";
  description: string = "";
  price: number = 0.0;
  quantity: number = 0.0;
  createTime: Date = new Date();

  constructor(id?: number, title: string = "", price: number = 0.0) {
    this.id = id;
    this.title = title;
    this.price = price;
  }
}
