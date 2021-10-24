import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import useProductStore from "../../store/productStore";

import {
  Table,
  Space,
  Button,
  Modal,
  message,
  Input,
  Form,
  InputNumber,
} from "antd";

const useProduct = (props) => {
  const {} = props;
  const productStore = useProductStore();
  const [openDetail, setOpenDetail] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [openCreate, setOpenCreate] = useState(false);
  const [initialValue, setInitialValue] = useState({});
  const [openUpdate, setOpenUpdate] = useState(false);
  const [dataDelete, setDataDelete] = useState({});

  const [form] = Form.useForm();
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
          <Button key={text.productId} onClick={() => handleClickDelete(text)}>
            Delete Product
          </Button>
          <Button key={text.productId} onClick={() => handleClickUpdate(text)}>
            Update Product
          </Button>
        </Space>
      ),
    },
  ];

  const handleClickDelete = (data) => {
    setOpenDelete(true);
    setDataDelete(data);
  };

  const handleSubmitDelete = () => {
    productStore.deleteProduct(dataDelete.productId).then(() => {
      setOpenDelete(false);
      message.success("Delete Product is success ");
      setDataDelete({});
      callStore();
    });
  };

  const handleClickUpdate = async (value) => {
    let data = await productStore.getDetailByProductId(value.productId);

    setInitialValue({
      productName: value.productName,
      price: value.price,
      description: data.description,
      productId: value.productId,
    });

    setOpenUpdate(true);
  };

  const handleOk = () => {
    setOpenDetail(false);
    setOpenUpdate(false);
    setInitialValue({});
  };

  const handleCancel = () => {
    setOpenDetail(false);
    setOpenDelete(false);
    setOpenCreate(false);
    setOpenUpdate(false);
    setInitialValue({});
  };

  const handleClickDetail = (id) => {
    productStore.getDetailByProductId(id);
    setOpenDetail(true);
  };

  const handleClickAddProduct = async () => {
    setOpenCreate(true);
  };

  const handleSubmitAddProduct = async (value) => {
    setOpenCreate(false);

    productStore.createProduct(value).then(() => {
      message.success("Create Product is success ");
      setInitialValue({});
      callStore();
    });
  };

  const handleUpdateProduct = async (value) => {
    setOpenUpdate(false);
    productStore.updataProduct(initialValue.productId, value).then(() => {
      message.success("Update Product is success ");
      setInitialValue({});
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
    handleClickAddProduct,
    openDelete,
    openUpdate,
    openCreate,
    handleSubmitAddProduct,
    form,
    initialValue,
    handleUpdateProduct,
    dataDelete,
    handleSubmitDelete,
  };
};

let ProductView = ({
  dataSource,
  columns,
  detail,
  openDetail,
  handleOk,
  handleCancel,
  handleClickAddProduct,
  openDelete,
  openUpdate,
  openCreate,
  handleSubmitAddProduct,
  form,
  initialValue,
  handleUpdateProduct,
  dataDelete,
  handleSubmitDelete,
  ...props
}) => {
  return (
    <div style={{ padding: "20px" }}>
      <div style={{ width: "100%", textAlign: "right" }}>
        <Button onClick={handleClickAddProduct}>Create Product</Button>
      </div>
      <Table columns={columns} dataSource={dataSource} />

      <Modal
        title="Detail Product"
        visible={openDetail}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Name : {detail.productName}</p>
        <p>Price : {detail.price}</p>
        <p>Description : {detail.description}</p>
      </Modal>

      <Modal
        title="Update Product"
        visible={openUpdate}
        footer={[]}
        onCancel={handleCancel}
      >
        <Form
          name="update"
          form={form}
          onFinish={handleUpdateProduct}
          initialValues={initialValue}
        >
          <Form.Item
            label="Product Name"
            name="productName"
            rules={[{ required: true }]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item label="Price" name="price" rules={[{ required: true }]}>
            <InputNumber
              placeholder="Price"
              style={{ width: "100%" }}
              min={0}
            />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input placeholder="Description" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Delete Product "
        visible={openDelete}
        onOk={handleSubmitDelete}
        onCancel={handleCancel}
      >
        Confirm Detele {dataDelete?.productName} ?
      </Modal>

      <Modal
        title="Create Product"
        visible={openCreate}
        footer={[]}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={handleSubmitAddProduct} name="create">
          <Form.Item
            label="Product Name"
            name="productName"
            rules={[{ required: true }]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item label="Price" name="price" rules={[{ required: true }]}>
            <InputNumber
              placeholder="Price"
              style={{ width: "100%" }}
              min={0}
            />
          </Form.Item>
          <Form.Item label="Amount" name="amount" rules={[{ required: true }]}>
            <InputNumber
              placeholder="Amount"
              style={{ width: "100%" }}
              min={1}
            />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input placeholder="Description" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

let Product = ({ ...others }) => {
  const product = useProduct({});
  return <ProductView {...product} {...others} />;
};

export default observer(Product);
