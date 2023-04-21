import { React } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import useApi from "../helpers/useApi";

function DeleteProduct(props) {
  const api = useApi();
  const { token } = useSelector((state) => state.user);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.requests({
        method: "DELETE",
        url: `/product/${props.id}`,
        headers: {
          Authorization: `${token}`,
        },
      });
      props.deleted();
      props.refresh();
    } catch (err) {
      throw err;
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
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleSubmit}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
export default DeleteProduct;
