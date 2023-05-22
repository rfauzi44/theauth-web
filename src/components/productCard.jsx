import { Card, Button } from "react-bootstrap";
import { React, useState } from "react";
import UpdateProduct from "../components/updateProduct";
import DeleteProduct from "../components/deleteProduct";

function ProductCard(props) {
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const handleUpdateProduct = () => {
    setShowModalUpdate(true);
  };

  const handleCloseModalUpdate = () => {
    setShowModalUpdate(false);
  };

  const [showModalDelete, setShowModalDelete] = useState(false);
  const handleDeleteProduct = () => {
    setShowModalDelete(true);
  };

  const handleCloseModalDelete = () => {
    setShowModalDelete(false);
  };

  const handleRefresh = () => {
    props.refresh();
  };

  const createdTime = new Date(props.created_at).toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });

  let updateTime;
  if (props.updated_at == null) {
    updateTime = "No update yet";
  } else {
    updateTime = new Date(props.updated_at).toLocaleString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });
  }

  function formatCurrency(number) {
    return Number(number).toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  }

  return (
    <Card style={{ margin: "10px" }}>
      <Card.Img variant="top" src={props.image} />
      <Card.Body style={{display: "grid"}}>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
        <Card.Text>
          <b>Price</b> {formatCurrency(props.price)}
        </Card.Text>
        <Card.Text>
          <b>Created</b> {createdTime}
        </Card.Text>
        <Card.Text>
          <b>Update</b> {updateTime}
        </Card.Text>
        <div className="d-flex justify-content-between mt-3">
          <Button variant="primary" onClick={handleUpdateProduct}>
            Update
          </Button>
          <Button variant="danger" onClick={handleDeleteProduct}>
            Delete
          </Button>
        </div>
      </Card.Body>

      <UpdateProduct
        id={props.id}
        show={showModalUpdate}
        onHide={handleCloseModalUpdate}
        updated={handleCloseModalUpdate}
        refresh={handleRefresh}
      />

      <DeleteProduct
        id={props.id}
        show={showModalDelete}
        onHide={handleCloseModalDelete}
        deleted={handleCloseModalDelete}
        refresh={handleRefresh}
      />
    </Card>
  );
}

export default ProductCard;
