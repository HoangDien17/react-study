import ky from "ky";

export const fetchData = async (keyword: string) =>
  await ky
    .get(
      `https://www.omdbapi.com/?i=tt3896198&apikey=c270df1b&type=movie&s=${keyword}`
    )
    .json();
