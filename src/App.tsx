import "react-toastify/dist/ReactToastify.css";

import { IItem, IItemExtra } from "./interfaces/item.interface";
import { useEffect, useMemo, useState } from "react";

import DialogCartDetail from "./components/dialog-cart-detail.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@material-tailwind/react";
import Item from "./components/item.component";
import ItemLazyLoading from "./components/item.lazy.loading";
import NotFound from "./components/notFound.component";
import { ToastContainer } from "react-toastify";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { fetchData } from "./services/item/item.service";
import useDebounce from "./hooks/useDebound";

function App() {
  const [data, setData] = useState<any>([]);
  const [search, setSearch] = useState<string>("fast");
  const [cart, setCart] = useState<Map<string, IItemExtra>>(
    new Map<string, IItemExtra>()
  );
  const [isAdded, setIsAdded] = useState<boolean>(false);

  // handle to open cart detail
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedValue = useDebounce<string>(search, 300);

  const onSearch = (e: any) => {
    if (!e.target.value) {
      setSearch("fast");
    } else {
      setSearch(e.target.value);
    }
  };

  const getData = async (search: string) => {
    try {
      // set loading
      setIsLoading(true);

      const res: any = await fetchData(search);
      if (Array.isArray(res.Search) && res.Search.length > 0) {
        const newData = res?.Search.map((item: IItemExtra) => {
          return {
            ...item,
            price: Math.floor(Math.random() * 10) + 1,
            quantity: 0,
          };
        });
        setData(newData);
      } else {
        setData([]);
      }
    } catch (error) {
      // handle error here
    } finally {
      setIsLoading(false);
    }
  };

  const hasMovies = useMemo(
    () => Array.isArray(data) && data.length > 0,
    [data]
  );

  useEffect(() => {
    getData(debouncedValue);
  }, [debouncedValue]);

  return (
    <>
      <div className="pt-5 block md:flex md:justify-around md:relative px-4">
        <h1 className="text-3xl font-bold xl:p-12 w-full pr-5 md:pr-0">
          List of my favorite cinemas
        </h1>
        <div className="w-full my-5 flex flex-col xl:w-72 gap-6 justify-center items-center">
          <Input label="Search" success onChange={onSearch} />
        </div>
        <div className="absolute top-7 right-4 md:relative md:top-0 md:right-0 md:ml-5 flex flex-col justify-center items-center">
          <FontAwesomeIcon
            icon={faCartShopping}
            size="xl"
            className="cursor-pointer"
            onClick={handleOpen}
          />
          <DialogCartDetail
            open={open}
            handleOpen={handleOpen}
            cart={cart}
            setCart={setCart}
          />
          {cart.size > 0 && (
            <div className="rounded-[50%] w-6 h-6 absolute mb-9 ml-8 cursor-default bg-red-600 text-white text-center">
              {cart.size}
            </div>
          )}
        </div>
      </div>
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 w-full px-4">
          {Array.from(Array(10).keys()).map((i) => (
            <ItemLazyLoading key={i} />
          ))}
        </div>
      ) : hasMovies ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 w-full px-4">
          {data.map((item: IItem, index: number) => (
            <Item
              key={index}
              item={item}
              setCart={setCart}
              cart={cart}
              isAdded={isAdded}
              setIsAdded={setIsAdded}
            />
          ))}
        </div>
      ) : (
        <NotFound />
      )}

      {/* 
      {!isLoading && isCheckedData(data) && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 w-full px-4">
          {data.map((item: IItem, index: number) => (
            <Item
              key={index}
              item={item}
              setCart={setCart}
              cart={cart}
              isAdded={isAdded}
              setIsAdded={setIsAdded}
            />
          ))}
        </div>
      )} */}
      {isAdded && <ToastContainer autoClose={8000} className="absolute" />}
    </>
  );
}

export default App;
