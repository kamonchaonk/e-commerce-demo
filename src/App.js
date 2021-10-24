import React, { useState } from "react";

import "antd/dist/antd.css";

import { Button, Layout } from "antd";
import Admin from "./component/admin/admin";
import Customer from "./component/customer/customer";
const { Header, Content } = Layout;

const useApp = () => {
  const [page, setsPage] = useState("Customer");

  const handleUser = (user) => {
    setsPage(user);
  };

  return { handleUser, page };
};

const App = () => {
  const { handleUser, page } = useApp();

  return (
    <Layout>
      <Header>
        <Button onClick={() => handleUser("Customer")}>Customer</Button>
        <Button onClick={() => handleUser("Admin")}>Admin</Button>
      </Header>
      <Content>{page === "Customer" ? <Customer /> : <Admin />}</Content>
    </Layout>
  );
};

export default App;
