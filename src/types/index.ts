export interface Product {
  id: number;
  reference: string;
  name: string;
  description: string;
  price: string;
  tax: number;
  quantity: number;
}

export interface Order {
  id: number;
  orderId: string;
  products: Array<Pick<Product, "reference" | "quantity">>;
  price: number;
  totalPrice: number;
}
