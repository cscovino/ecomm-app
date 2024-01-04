import { API_URL } from "@/config";
import { Product } from "@/types";

export async function getProducts(): Promise<Product[]> {
  const productsEndpoint = `${API_URL}/products`;
  const resp = await fetch(productsEndpoint, { cache: "no-cache" });
  const data = await resp.json();
  return data;
}
