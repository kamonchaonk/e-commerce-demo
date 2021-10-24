import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import useProductStore from "../../store/productStore";

import { Table, Space, Button, Modal, message } from "antd";

const useProduct = (props) => {
  const {} = props;
  const productStore = useProductStore();
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    callStore();
  }, []);

  const callStore = async () => {
    await productStore.getAllProduct();
  };

  let list = productStore.productList;

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
          <Button
            key={text.productId}
            onClick={() => handleClickDetail(text.productId)}
          >
            View Detail
          </Button>
        </Space>
      ),
    },
  ];

  const handleOk = () => {
    setOpenDetail(false);
  };

  const handleCancel = () => {
    setOpenDetail(false);
  };

  const handleClickDetail = (id) => {
    productStore.getDetailByProductId(id);
    setOpenDetail(true);
  };

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleAddOrder = async () => {
    let arr = [];
    let price = 0;
    selectedRowKeys.forEach((id) => {
      let data = list.find((item) => item.stockId === id);
      if (data) {
        price += data.price;
        let temp = { ...data, total: data.price * 1, amount: 1 };

        arr.push(temp);
      }
    });
    let param = {
      customerName: "customer",
      totalPrice: price,
      orderProducts: arr,
    };

    productStore.createOrder(param).then(() => {
      message.success("Create Order is success ");
      setSelectedRowKeys([]);
      callStore();
    });
  };

  return {
    dataSource,
    columns,
    detail: productStore.detail,
    openDetail,
    handleOk,
    handleCancel,
    rowSelection,
    handleAddOrder,
  };
};

let ProductView = ({
  dataSource,
  columns,
  rowSelection,
  detail,
  openDetail,
  handleOk,
  handleCancel,
  handleAddOrder,
  ...props
}) => {
  return (
    <div style={{ padding: "20px" }}>
      <div style={{ width: "100%", textAlign: "right" }}>
        <Button
          disabled={!rowSelection.selectedRowKeys.length}
          onClick={handleAddOrder}
        >
          Create Order
        </Button>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
      />

      <Modal
        title="Detail"
        visible={openDetail}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Name : {detail.productName}</p>
        <p>Price : {detail.price}</p>
        <p>Description : {detail.description}</p>
      </Modal>
    </div>
  );
};

let Product = ({ ...others }) => {
  const product = useProduct({});
  return <ProductView {...product} {...others} />;
};

export default observer(Product);
