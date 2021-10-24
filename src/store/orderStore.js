import { useContext, createContext } from "react";
import { observable, action, runInAction } from "mobx";
import { fetchGet, fetchPost } from "../utility/request";

const urlOrder = "http://localhost:3000/orders";

class OrderStore {
  @observable orderList = [];
  @observable detail = [];
  @action getAllOrderByCustomer = async (data) => {
    const url = urlOrder;

    const res = await fetchPost(url, data);

    runInAction(() => {
      this.orderList = res;
    });
  };

  @action getOrderDetailById = async (id) => {
    const url = urlOrder + "/" + id;

    const res = await fetchGet(url);

    runInAction(() => {
      this.detail = res;
    });
  };
}

const orderStore = new OrderStore();
const OrderStoreContext = createContext(orderStore);
const useOrderStore = () => useContext(OrderStoreContext);
export default useOrderStore;
