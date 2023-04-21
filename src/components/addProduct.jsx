import { React, useState } from "react";
import axios from "axios";
import { Button, Container, Form, Modal, Alert } from "react-bootstrap";

function AddProduct(props) {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
  });

  const onChangeInput = (event) => {
    event.preventDefault();
    const data = { ...product };
    data[event.target.name] = event.target.value;
    setProduct(data);
  };

  const fileHandler = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      const data = { ...product };
      data["image"] = file;
      setProduct(data);
    }
  };

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      for (const key in product) {
        formData.append(key, product[key]);
      }
      await axios({
        method: "POST",
        url: process.env.REACT_APP_BASE_API_URL + "/product",
        headers: {
          enctype: "multipart/form-data",
          Authorization: `${props.token}`,
        },
        data: formData,
      });

      props.added();
      props.refresh();
    } catch (err) {
      setErrorMessage(err.response.data.result);
    }
  };

  return (
    <Container>
      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={props.show}
        onHide={props.onHide}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="productName" className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={onChangeInput}
                required
              />
            </Form.Group>
            <Form.Group controlId="description" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                onChange={onChangeInput}
                required
              />
            </Form.Group>
            <Form.Group controlId="price" className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                step="1"
                name="price"
                onChange={onChangeInput}
                required
              />
            </Form.Group>
            <Form.Group controlId="image" className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" name="image" onChange={fileHandler} />
            </Form.Group>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Button type="submit" className="w-100">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
export default AddProduct;
