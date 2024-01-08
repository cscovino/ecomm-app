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
  orderNumber: string;
  products: Array<Product & { orderQuantity: number }>;
  price: number;
  totalPrice: number;
}
