import { Alert, Button, IconButton, Tooltip } from "@material-tailwind/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { handleItemName } from "../utils/help";

export default function Item({item, setCart, cart, setIsAdded}: any) {
  const [quantity, setQuantity] = useState(1);

  function notify() {
    toast.success("Added to cart successfully", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
    });
  };
  
  function addToCart(item: any) {
    const newCart = new Set(cart)
    newCart.add(item)
    setCart(newCart)
    setIsAdded(true)
    notify()
    return (
      <Alert color="green">A success alert for showing message.</Alert>
    )
  }

  function onChangeQuantity(action: string) {
    if (action === "add") {
      if (quantity === 9) {
        return;
      }
      setQuantity(quantity + 1);
    }
    if (action === "subtract") {
      if (quantity === 1) {
        return;
      }
      setQuantity(quantity - 1);
    }
  }

  return (
    <div className="item rounded-lg border-2 m-4 shadow-lg bg-purple-50 border-solid border-gray-300">
      <div className="item__image">
        <img
          src={item.Poster}
          alt="item"
          className="bg-gradient-to-t w-full max-h-[350px] min-h-[350px] rounded-tl-lg rounded-tr-lg"
        />
      </div>
      <div className="item__info p-2">
        <Tooltip content={item.Title} className="bg-gray-500 text-white">
          <h3 className="item__title text-center text-orange-400 h-[40px]">
            {handleItemName(item.Title)}
          </h3>
        </Tooltip>
        <div className="flex justify-between">
          <div className="item__price text-cyan-500 text-center w-[40%]">
            ${item.price}
          </div>
          <div className="flex justify-evenly w-[70%]">
            <IconButton
              variant="outlined"
              size="sm"
              onClick={() => onChangeQuantity("add")}
            >
              +
            </IconButton>
            <span className="text-center">{quantity}</span>
            <IconButton
              variant="gradient"
              size="sm"
              color="red"
              onClick={() => onChangeQuantity("subtract")}
            >
              -
            </IconButton>
          </div>
        </div>
      </div>
      <hr />
      <div className="p-2 flex justify-around">
        <Button className="rounded-2xl min-w-[70%]" onClick={() => addToCart(item)}>
          Add
        </Button>
      </div>
    </div>
  );
}
