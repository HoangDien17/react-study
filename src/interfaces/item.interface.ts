export interface IItem {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
  price: number;
}

export interface IItemExtra extends IItem {
    quantity: number,
}
