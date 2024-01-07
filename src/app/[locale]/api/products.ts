import { API_URL } from "@/config";
import { Product } from "@/types";

export async function getProducts(): Promise<Product[]> {
  const productsEndpoint = `${API_URL}/products`;
  const resp = await fetch(productsEndpoint, { cache: "no-cache" });
  const data = await resp.json();
  return data;
}

export async function getProductById(id: string): Promise<Product> {
  const productsEndpoint = `${API_URL}/products/${id}`;
  const resp = await fetch(productsEndpoint, { cache: "no-cache" });
  const data = await resp.json();
  return data;
}

export async function putProduct(payload: Product): Promise<Product> {
  const productsEndpoint = `${API_URL}/products/${payload.id}`;
  const resp = await fetch(productsEndpoint, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await resp.json();
  return data;
}

export async function postProduct(payload: Product): Promise<Product> {
  const productsEndpoint = `${API_URL}/products`;
  const resp = await fetch(productsEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await resp.json();
  return data;
}

export async function deleteProduct(id: number): Promise<Product> {
  const productsEndpoint = `${API_URL}/products/${id}`;
  const resp = await fetch(productsEndpoint, {
    method: "DELETE",
    cache: "no-cache",
  });
  const data = await resp.json();
  return data;
}
