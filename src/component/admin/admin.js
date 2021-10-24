import React from "react";

import { Tabs } from "antd";
import Product from "./product";
import Stock from "./stock";
const useAdmin = (props) => {
  const {} = props;
  const handleTabs = () => {};
  return { handleTabs };
};

let AdminView = ({ handleTabs }) => {
  const { TabPane } = Tabs;
  return (
    <>
      <div style={{ margin: "10px" }}>
        <Tabs defaultActiveKey="1" onChange={handleTabs}>
          <TabPane tab="Manage Product" key="1">
            <Product />
          </TabPane>
          <TabPane tab="Manage Stock" key="2">
            <Stock />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

let Admin = ({ ...others }) => {
  const admin = useAdmin({});
  return <AdminView {...admin} {...others} />;
};

export default Admin;
