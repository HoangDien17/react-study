import { Dispatch, Fragment, SetStateAction } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
} from "@material-tailwind/react";
import { handler } from "@material-tailwind/react/types/components/dialog";
import { IItemExtra } from "../interfaces/item.interface";

export default function DialogCartDetail(data: {
  open: boolean;
  handleOpen: handler;
  cart: Map<string, IItemExtra>
  setCart: Dispatch<SetStateAction<Map<string, IItemExtra>>>
}) {
  const { open, handleOpen, cart, setCart } = data;
  const products = Array.from(cart.values()) as IItemExtra[];
  const totalSubtotal = products.reduce((acc, item) => acc + item.price * item.quantity, 0)

  function removeItemInCart(key: string) {
    const oldCart = new Map<string, IItemExtra>(cart)
    oldCart.delete(key)
    setCart(oldCart)
  }
  return (
    <Fragment>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader className="flex justify-between">
          <h4>Cart Detail</h4>
          <IconButton variant="outlined" onClick={handleOpen}>
            <span>X</span>
          </IconButton>
        </DialogHeader>
        <DialogBody divider>
          <div className="max-h-[500px] flex-col overflow-y-scroll bg-white shadow-xl">
            {totalSubtotal > 0 ? (<><div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
              <div className="mt-8 ">
                <div className="flow-root">
                  <ul className="-my-6 divide-y divide-gray-200">
                    {products.map((product) => (
                      <li key={product.Title} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={product.Poster}
                            alt="Item in cart"
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <p>{product.Title}</p>
                              </h3>
                              <p className="ml-4">${product.price}</p>
                            </div>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-gray-500">
                              Qty {product.quantity}
                            </p>

                            <div className="flex">
                              <button
                                type="button"
                                className="font-medium text-red-900 hover:text-red-600"
                                onClick={() => removeItemInCart(product.Title)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${totalSubtotal}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-6">
                <a
                  href="/#"
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Checkout
                </a>
              </div>
            </div>
            </>) : (<h1 className=" flex justify-center items-center text-red-700">Cart empty</h1>)
            }
          </div>
        </DialogBody>
      </Dialog>
    </Fragment>
  );
}
