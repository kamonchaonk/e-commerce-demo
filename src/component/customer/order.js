import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import useOrderStore from "../../store/orderStore";
import moment from "moment";

import { Table, Space, Button, Modal, message, List } from "antd";
const useOrder = (props) => {
  const {} = props;

  const [openDetail, setOpenDetail] = useState(false);
  const orderStore = useOrderStore();

  useEffect(() => {
    callStore();
  }, []);

  const callStore = async () => {
    await orderStore.getAllOrderByCustomer({ customerName: "customer" });
  };

  let list = orderStore.orderList;
  const dataSource = list.map((item, index) => {
    return {
      ...item,
      date: moment(item.createDate).format("DD/MM/yyyy hh:mm"),
      key: index,
    };
  });

  const columns = [
    {
      title: "Order Id",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Create Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "total price",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            key={text.orderId}
            onClick={() => handleClickDetail(text.orderId)}
          >
            View Detail
          </Button>
        </Space>
      ),
    },
  ];

  const handleClickDetail = async (orderId) => {
    setOpenDetail(true);
    await orderStore.getOrderDetailById(orderId);
  };
  const handleOk = () => {
    setOpenDetail(false);
  };

  const handleCancel = () => {
    setOpenDetail(false);
  };
  return {
    columns,
    dataSource,
    handleOk,
    handleCancel,
    detail: orderStore.detail,
    openDetail,
  };
};

let OrderView = ({
  columns,
  dataSource,
  detail,
  handleCancel,
  handleOk,
  openDetail,
  ...props
}) => {
  return (
    <>
      <div style={{ padding: "20px" }}>
        <Table columns={columns} dataSource={dataSource} />
        <Modal
          title="Detail"
          visible={openDetail}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {detail.length > 0
            ? detail.map((itemObj, index) => {
                return (
                  <div key={index}>
                    <p>Name : {itemObj.productName}</p>
                    <p>Price : {itemObj.price}</p>
                    <p>Amount : {itemObj.amount}</p>
                    <hr />
                  </div>
                );
              })
            : null}
        </Modal>
      </div>
    </>
  );
};

let Order = observer(({ ...others }) => {
  const order = useOrder({});
  return <OrderView {...order} {...others} />;
});

export default Order;
