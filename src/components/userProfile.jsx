import React from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";

function UserProfile() {
  const { data } = useSelector((state) => state.user);
  const formattedDate = new Date(data.created_at).toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Card bg="dark" text="light" style={{ margin: "10px" }}>
      <Card.Body>
        <Card.Title>Profile Information</Card.Title>
        <Card.Text>
          <div>Name: {data.name}</div>
          <div>Email: {data.email}</div>
          <div>
            Gender:{" "}
            <span style={{ "text-transform": "capitalize" }}>
              {data.gender}
            </span>
          </div>

          <div>Registered: {formattedDate}</div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default UserProfile;
