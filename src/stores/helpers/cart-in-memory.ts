import { ProductProps } from "@/utils/data/products";
import { ProductCartProps } from "../cart-stores";


export function add(products: ProductCartProps[], newProduct: ProductProps) {

  const existingProduct = products.find(({ id }) => id === newProduct.id);

  if (existingProduct) {
    return products.map((product) => product.id === existingProduct.id ? { ...product, quantity: product.quantity + 1 } : product);
  }

  return [...products, { ...newProduct, quantity: 1 }];

}


export function remove(product: ProductCartProps[], productRemoveId: string) {
  const updatedProduct = product.map((product) => (
    product.id === productRemoveId ? {
      ...product,
      quantity: product.quantity > 1 ? product.quantity - 1 : 0
    } : product
  ))
  return updatedProduct.filter((product) => product.quantity > 0)
}
