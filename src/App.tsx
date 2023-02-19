import { useEffect, useState } from "react";
import Item from "./components/item.component";
import { fetchData} from './services/item/item.service'
import { Input } from "@material-tailwind/react";
import NotFound from "./components/notFound.component";
import useDebounce from "./hooks/useDebound";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { IItem, IItemExtra } from "./interfaces/item.interface";
import DialogCartDetail from "./components/dialog-cart-detail.component";

function App() {
const [data, setData] = useState<any>([])
const [search, setSearch] = useState<string>('fast')
const [cart, setCart] = useState<Map<string, IItemExtra>>(new Map<string, IItemExtra>())
const [isAdded, setIsAdded] = useState<boolean>(false)

// handle to open cart detail
const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(!open);

const debouncedValue = useDebounce<string>(search, 300)

const onSearch = (e: any) => {
  if(!e.target.value) {
    setSearch('fast')
  } else {
    setSearch(e.target.value)
  }
}

const getData = async (search: string) => {
  const res: any =  await fetchData(search)
  if(Array.isArray(res.Search) && res.Search.length > 0) {
    const newData = res?.Search.map((item: IItemExtra) => {
      return {...item, price: Math.floor(Math.random() * 10) + 1, quantity: 0}
    })
    setData(newData)
  } else {
    setData([])
  }
}

function isCheckedData(data: any) {
  return Array.isArray(data) && data.length > 0
}

  useEffect(() => {
    getData(debouncedValue)
  }, [debouncedValue])

  return (
    <>
    <div className="flex justify-around relative">
      <h1 className="text-3xl font-bold p-12">
        List of my favorite cinemas
      </h1>
      <div className="flex flex-col w-72 gap-6 justify-center items-center">
        <Input label="Search" success onChange={onSearch}/>
      </div>
      <div className="flex justify-center items-center">
        <FontAwesomeIcon icon={faCartShopping} size="xl" className="cursor-pointer" onClick={handleOpen}/>
        < DialogCartDetail open={open} handleOpen={handleOpen} cart={cart} setCart={setCart}/>
        {cart.size > 0 && (<div className="rounded-[50%] w-6 h-6 absolute mb-9 ml-8 cursor-default bg-red-600 text-white text-center">{cart.size}</div>) }
      </div>
    </div>

    {isCheckedData(data) ? (
      <div className="inline-grid grid-cols-6">
        {data.map((item: IItem, index: number) => (
          <Item key={index} item={item} setCart={setCart} cart={cart} isAdded={isAdded} setIsAdded={setIsAdded}/>
        ))}
      </div>
    ) : (< NotFound />) }
    {isAdded && (<ToastContainer autoClose={8000} className="absolute"/>)}
    </>
  );
}

export default App;
