import { Button, IconButton } from "@material-tailwind/react";

const ItemLazyLoading = () => (
  <div className="item rounded-lg shadow-lg border-solid animate-pulse">
    <div className="item__image before:w-full before:h-0 pt-[150%] relative">
      <div className="absolute top-0 left-0 w-full object-cover bg-gradient-to-t rounded-tl-lg rounded-tr-lg h-full bg-gray-200"></div>
    </div>
    <div className="item__info p-2 h-[88px] flex items-center justify-center">
      <div className="flex justify-center items-center w-[70%]">
        <IconButton
          variant="outlined"
          size="sm"
          className="bg-gray-200 outline-none border-none"
        >
          <span className="hidden">+</span>
        </IconButton>
        <div className="w-12 h-5 bg-gray-200 flex items-center justify-center mx-4">
          <span className="hidden">quantity</span>
        </div>
        <IconButton
          variant="outlined"
          size="sm"
          className="bg-gray-200 outline-none border-none"
        >
          <span className="hidden">-</span>
        </IconButton>
      </div>
    </div>
    <div className="p-2 flex justify-around h-14">
      <Button className="rounded-2xl min-w-[70%] bg-gray-200">
        <span className="hidden">loading</span>
      </Button>
    </div>
  </div >
);

export default ItemLazyLoading;
