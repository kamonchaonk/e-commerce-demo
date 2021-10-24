import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Table, Space, Button, Modal, message, InputNumber } from "antd";

import useStockStore from "../../store/stockStore";

const useStock = (props) => {
  const stockStore = useStockStore();
  const [openUpdate, setOpenUpdate] = useState(false);
  const [data, setData] = useState({
    amount: 0,
    productId: null,
    stockId: null,
  });

  useEffect(() => {
    callStore();
  }, []);

  const callStore = async () => {
    await stockStore.getAllStocks();
  };
  const list = stockStore.stockList;

  const dataSource = list.map((item) => {
    return { ...item, key: item.stockId };
  });
  const columns = [
    {
      title: "Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Sold",
      dataIndex: "sold",
      key: "sold",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button key={text.productId} onClick={() => handleClickUpdate(text)}>
            Update Product
          </Button>
        </Space>
      ),
    },
  ];

  const handleClickUpdate = (value) => {
    setData({
      amount: value.amount,
      productId: value.productId,
      stockId: value.stockId,
    });
    setOpenUpdate(true);
  };

  const handleCancel = () => {
    setOpenUpdate(false);
    setData({ amount: 0, productId: null });
  };

  const onChangeData = (value) => {
    setData({ ...data, amount: value });
  };

  const handleSubmitUpdate = () => {
    setOpenUpdate(false);
    stockStore
      .updateStock(data.stockId, {
        productId: data.productId,
        amount: data.amount,
      })
      .then(() => {
        message.success("Update Stock is success ");
        setData({ stockId: null, productId: null, amount: 0 });
        callStore();
      });
  };

  return {
    dataSource,
    columns,
    data,
    openUpdate,
    handleCancel,
    handleSubmitUpdate,
    onChangeData,
  };
};

let StockView = ({
  columns,
  dataSource,
  data,
  openUpdate,
  handleCancel,
  handleSubmitUpdate,
  onChangeData,
}) => {
  return (
    <div style={{ padding: "20px" }}>
      <Table columns={columns} dataSource={dataSource} />
      <Modal
        title="Update Stock"
        visible={openUpdate}
        onOk={handleSubmitUpdate}
        onCancel={handleCancel}
      >
        Amount :
        <InputNumber
          placeholder="Amount"
          style={{ width: "100%" }}
          value={data.amount}
          min={1}
          onChange={onChangeData}
        />
      </Modal>
    </div>
  );
};

let Stock = observer(({ ...others }) => {
  const stock = useStock({});
  return <StockView {...stock} {...others} />;
});

export default Stock;
