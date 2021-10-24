import React from "react";

import { Tabs } from "antd";
import Product from "./product";
import Order from "./order";

const useCustomer = (props) => {
  const {} = props;

  const handleTabs = () => {};

  return { handleTabs };
};

let CustomerView = ({ handleTabs }) => {
  const { TabPane } = Tabs;
  return (
    <div style={{ margin: "10px" }}>
      <Tabs defaultActiveKey="1" onChange={handleTabs}>
        <TabPane tab="Product List" key="1">
          <Product />
        </TabPane>
        <TabPane tab="My Orders" key="2">
          <Order />
        </TabPane>
      </Tabs>
    </div>
  );
};

let Customer = ({ ...others }) => {
  const customer = useCustomer({});
  return <CustomerView {...customer} {...others} />;
};

export default Customer;
