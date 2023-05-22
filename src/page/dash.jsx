import { React, useState, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import useApi from "../helpers/useApi";
import ProductCard from "../components/productCard";
import AddProduct from "../components/addProduct";
import MyNavbar from "../components/myNavbar";
import UserProfile from "../components/userProfile";

function Dash() {
  const api = useApi();
  const { token } = useSelector((state) => state.user);

  const [product, setProduct] = useState([]);

  const getProduct = async () => {
    try {
      const response = await api.requests({
        method: "GET",
        url: "/product",
        headers: {
          Authorization: `${token}`,
        },
      });
      const data = response.data.result;
      setProduct(data);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const [showAddProduct, setShowAddProduct] = useState(false);
  const handleAddProduct = () => {
    setShowAddProduct(true);
  };

  const handleCloseAddProduct = () => {
    setShowAddProduct(false);
  };

  const handleRefresh= () => {
    getProduct();
  };

  return (
    <>
      <MyNavbar />
      <Container className="py-3">
        <Col xs={12} sm={6} md={4} lg={4}>
          <UserProfile />
        </Col>
        <div className="text-end" style={{ margin: "10px" }}>
          <Button variant="primary" onClick={handleAddProduct}>
            Add New Product
          </Button>
        </div>
        <Row>
          {product.map((v) => (
            <Col style= {{display: "flex"}}key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard
                id={v.id}
                name={v.name}
                description={v.description}
                price={v.price}
                image={v.image}
                created_at={v.created_at}
                updated_at={v.updated_at}
                refresh={handleRefresh}
              />
            </Col>
          ))}
        </Row>
        <AddProduct
          show={showAddProduct}
          onHide={handleCloseAddProduct}
          added={handleCloseAddProduct}
          refresh={handleRefresh}
          token={token}
        />
      </Container>
    </>
  );
}
export default Dash;
