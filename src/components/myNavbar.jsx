import { useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout, setData } from "../store/reducer/user";
import useApi from "../helpers/useApi";

function MyNavbar() {
  const { isAuth, data } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const api = useApi();

  const getUser = async () => {
    try {
      const response = await api.requests({
        method: "GET",
        url: "/auth/me",
      });
      const data = response.data.result[0];
      dispatch(setData(data));
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (isAuth) {
      getUser();
    }
  }, [isAuth]);

  const doLogout = () => {
    dispatch(logout(data.token));
  };

  return (
    <Navbar bg="light" expand="md">
      <Container>
        <Navbar.Brand href="/">The Auth</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Dashboard</Nav.Link>
          </Nav>
          <Nav>
            {!isAuth ? (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/signup">Signup</Nav.Link>
              </>
            ) : (
              <>
                <span className="navbar-text me-3">Welcome {data.name}</span>
                <Nav.Link onClick={doLogout}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
