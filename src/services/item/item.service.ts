import { IItem } from "../../interfaces/item.interface";
import ky from "ky";

type MovieResponse = {
  Response: "True" | "False";
  Search: IItem[];
  totalResults: string;
};

export const fetchData = async (keyword: string) => {
  // initial page number
  let page = 1;
  let totalPage = 1;
  let movies: IItem[] | [] = [];

  do {
    const res: MovieResponse = await ky
      .get(
        `https://www.omdbapi.com/?i=tt3896198&apikey=c270df1b&type=movie&s=${keyword}&page=${page}`
      )
      .json();

    const { Search, totalResults } = res;
    movies = [...movies, ...Search];
    page++;

    if (totalPage === 1) {
      totalPage = Math.floor(Number(totalResults) / 10);
    }
  } while (page < totalPage);

  return {
    Search: movies,
  };
};
