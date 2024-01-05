import { API_URL } from "@/config";
import { Order } from "@/types";

export async function getOrders(): Promise<Order[]> {
  const ordersEndpoint = `${API_URL}/orders`;
  const resp = await fetch(ordersEndpoint, { cache: "no-cache" });
  const data = await resp.json();
  return data;
}

export async function getOrderById(id: string): Promise<Order> {
  const ordersEndpoint = `${API_URL}/orders/${id}`;
  const resp = await fetch(ordersEndpoint, { cache: "no-cache" });
  const data = await resp.json();
  return data;
}

export async function putOrder(payload: Order): Promise<any> {
  const ordersEndpoint = `${API_URL}/orders/${payload.id}`;
  const resp = await fetch(ordersEndpoint, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await resp.json();
  return data;
}
