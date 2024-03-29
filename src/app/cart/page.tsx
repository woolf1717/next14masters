import { redirect } from "next/navigation";
import { getCartFromCookies, handlePaymentAction } from "@/api/cart";

import { ChangeProductQuantity } from "@/ui/atoms/IncrementProductQuantity";
import { RemoveButton } from "@/ui/atoms/RemoveButton";
import { formatMoney } from "@/utils";

export default async function CartPage() {
  const cart = await getCartFromCookies();

  if (!cart) {
    redirect("/");
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cart &&
            cart.items.map((item) => (
              <tr key={item.product.id} className="p-2">
                <td>{item.product.name}</td>
                <td>{item.product.price}</td>
                <td>
                  {cart && (
                    <ChangeProductQuantity
                      quantity={item.quantity}
                      cartId={cart.id}
                      productId={item.product.id}
                    />
                  )}
                </td>
                <td>
                  {formatMoney((item.product.price * item.quantity) / 100)}
                </td>
                <td>
                  <RemoveButton cartId={cart.id} productId={item.product.id} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <form action={handlePaymentAction}>
        <button
          type="submit"
          className="border max-w-xs rounded-md  py-2 hover:bg-slate-800 shadow-sm mt-4 w-full bg-slate-950 text-white"
        >
          Pay
        </button>
      </form>
    </div>
  );
}
