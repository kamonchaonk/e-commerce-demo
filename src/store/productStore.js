import { useContext, createContext } from "react";
import { observable, action, runInAction } from "mobx";
import { fetchGet, fetchPost, fetchPut, fetchDelete } from "../utility/request";

const urlProduct = "http://localhost:3000/products";
const urlStock = "http://localhost:3000/stocks";
const urlOrder = "http://localhost:3000/orders";

class ProductStore {
  @observable productList = [];
  @observable detail = [];
  @action getAllProduct = async () => {
    const res = await fetchGet(urlStock);

    runInAction(() => {
      this.productList = res;
    });
  };

  @action getDetailByProductId = async (productId) => {
    const url = urlProduct + "/" + productId;
    const result = await fetchGet(url);

    runInAction(() => {
      this.detail = result;
    });

    return result;
  };

  @action createOrder = async (data) => {
    const url = urlOrder + "/create";
    const result = await fetchPost(url, data);
  };

  @action updataProduct = async (id, data) => {
    const url = urlProduct + "/" + id;
    const result = await fetchPut(url, data);
  };

  @action deleteProduct = async (id) => {
    const url = urlProduct + "/" + id;
    const result = await fetchDelete(url);
  };

  @action createProduct = async (data) => {
    const url = urlProduct + "/";
    const result = await fetchPost(url, data);
  };
}

const productStore = new ProductStore();
const ProductStoreContext = createContext(productStore);
const useProductStore = () => useContext(ProductStoreContext);
export default useProductStore;
