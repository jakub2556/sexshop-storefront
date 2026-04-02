import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import Divider from "@modules/common/components/divider"
import { HttpTypes } from "@medusajs/types"

const CartTemplate = ({ cart, customer }: { cart: HttpTypes.StoreCart | null; customer: HttpTypes.StoreCustomer | null }) => {
  return (
    <div className="py-12">
      <div className="content-container" data-testid="cart-container">
        <h1 className="section-heading text-3xl mb-8">Košík</h1>
        {cart?.items?.length ? (
          <div className="grid grid-cols-1 small:grid-cols-[1fr_360px] gap-x-12">
            <div className="flex flex-col py-6 gap-y-6">
              {!customer && (<><SignInPrompt /><Divider /></>)}
              <ItemsTemplate cart={cart} />
            </div>
            <div className="relative">
              <div className="flex flex-col gap-y-8 sticky top-20">
                {cart && cart.region && (
                  <div className="rounded-2xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                    <Summary cart={cart as any} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20"><EmptyCartMessage /></div>
        )}
      </div>
    </div>
  )
}

export default CartTemplate
