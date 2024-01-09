export interface Product {
  id: number;
  reference: string;
  name: string;
  description: string;
  price: string;
  tax: number;
  quantity: number;
}

export interface OrderProduct extends Product {
  orderQuantity: number;
}

export interface Order {
  id: number;
  orderNumber: string;
  products: Array<OrderProduct>;
  price: number;
  totalPrice: number;
}
