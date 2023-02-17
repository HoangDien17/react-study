import { Button } from "@material-tailwind/react";
export default function Item({ item }: any) {
  return (
    <div className="item rounded-lg border-2 m-4 shadow-lg">
      <div className="item__image">
        <img
          src={item.Poster}
          alt="item"
          className="bg-gradient-to-t w-full max-h-[350px] min-h-[350px] rounded-tl-lg rounded-tr-lg"
        />
      </div>
      <div className="item__info p-2">
        <h3 className="item__title text-center text-orange-400 h-[40px]">
          {item.Title}
        </h3>
        <div>
            <div className="item__price text-cyan-500">${item.price}</div>

        </div>
      </div>
      <hr />
      <div className="p-2 flex justify-around">
        <Button className="rounded-2xl">Add</Button>
        <Button className="bg-red-400 rounded-2xl">Remove</Button>
      </div>
    </div>
  );
}
