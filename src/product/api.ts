import axios from "axios";
import Papa from "papaparse";
import { SHEET_PATH } from "../../utils/constant";
import { Product } from "./types";

const fetchList = async (): Promise<Product[]> => {
  const response = await axios.get(SHEET_PATH, { responseType: "blob" });
  return new Promise<Product[]>((resolve, reject) => {
    Papa.parse(response.data, {
      header: true,
      complete: (results) => {
        const products = results.data as Product[];
        return resolve(
          products.map((product) => ({
            ...product,
            price: Number(product.price),
          }))
        );
      },
      error: (error) => reject(error.message),
    });
  });
};

export default fetchList;
