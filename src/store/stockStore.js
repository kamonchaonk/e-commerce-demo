import { useContext, createContext } from "react";
import { observable, action, runInAction } from "mobx";
import { fetchGet, fetchPost, fetchPut } from "../utility/request";

const urlProduct = "http://localhost:3000/products";
const urlStock = "http://localhost:3000/stocks";
const urlOrder = "http://localhost:3000/orders";

class StockStore {
  @observable stockList = [];
  @observable detail = [];

  @action getAllStocks = async () => {
    const url = urlStock;
    const res = await fetchGet(url);

    runInAction(() => {
      this.stockList = res;
    });
  };

  @action updateStock = async (id, data) => {
    const url = urlStock + "/" + id;
    await fetchPut(url, data);
  };
}

const stockStore = new StockStore();
const StockStoreContext = createContext(stockStore);
const useStockStore = () => useContext(StockStoreContext);
export default useStockStore;
