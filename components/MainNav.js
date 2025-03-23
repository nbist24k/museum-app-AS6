import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
  NavDropdown,
} from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import styles from "@/styles/MainNav.module.css";
import { addToHistory } from "@/lib/userData";
import { readToken, removeToken } from "@/lib/authenticate";

export default function MainNav() {
  // Getting a reference to the searchHistory
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const router = useRouter();
  let token = readToken();
  const [keyword, setKeyword] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearch = (event) => {
    event.preventDefault();
    const searchField = event.target.elements.search.value; // Adjust according to your form input's name attribute
    router.push(`/artwork?title=true&q=${searchField}`);
    setIsExpanded(false);
  };

  // Toggle the expanded state of the Navbar when the toggle button is clicked
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  async function submitForm(e) {
    e.preventDefault();
    setIsExpanded(false);

    // Don't proceed if the keyword is empty or just whitespace
    if (!keyword || keyword.trim() === "") {
      return; // Stop the function execution here
    }

    // Add the computed queryString value to the searchHistory
    let queryString = `title=true&q=${keyword}`;
    //setSearchHistory((current) => [...current, queryString]);
    setSearchHistory(await addToHistory(queryString, token));
    router.push(`/artwork?title=true&q=${keyword}`);
  }

  function logout() {
    setIsExpanded(false);
    removeToken();
    router.push("/login");
  }

  return (
    <>
      <Navbar
        bg="info"
        data-bs-theme="light"
        expand="lg"
        expanded={isExpanded}
        sticky="top"
      >
        <Container>
          <Navbar.Brand href="/">Nirajan Bist</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={toggleExpand}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link
                  active={router.pathname === "/"}
                  style={router.pathname === "/" ? { color: "white" } : {}}
                  onClick={() => setIsExpanded(false)}
                  className={styles.navLink}
                >
                  Home
                </Nav.Link>
              </Link>
              {token && (
                <Link href="/search" passHref legacyBehavior>
                  <Nav.Link
                    active={router.pathname === "/search"}
                    style={
                      router.pathname === "/search" ? { color: "white" } : {}
                    }
                    onClick={() => setIsExpanded(false)}
                    className={styles.navLink}
                  >
                    Advanced Search
                  </Nav.Link>
                </Link>
              )}
            </Nav>
            {!token && (
              <Nav>
                <Link href="/register" passHref legacyBehavior>
                  <Nav.Link
                    active={router.pathname === "/register"}
                    onClick={() => setIsExpanded(false)}
                  >
                    Register
                  </Nav.Link>
                </Link>
                <Link href="/login" passHref legacyBehavior>
                  <Nav.Link
                    active={router.pathname === "/login"}
                    onClick={() => setIsExpanded(false)}
                  >
                    Login
                  </Nav.Link>
                </Link>
              </Nav>
            )}
            &nbsp;
            {token && (
              <Form className="d-flex" onSubmit={submitForm}>
                <FormControl
                  type="search"
                  name="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <Button type="submit" variant="secondary">
                  Search
                </Button>
              </Form>
            )}
            &nbsp;
            <Nav>
              {token && (
                <NavDropdown
                  title={token.userName}
                  id="basic-nav-dropdown"
                  className={styles.navDropdownTitle}
                >
                  <Link href="/favourites" passHref legacyBehavior>
                    <NavDropdown.Item
                      active={router.pathname === "/favourites"}
                      onClick={() => setIsExpanded(false)}
                      className={styles.navDropdownItem}
                    >
                      Favourites
                    </NavDropdown.Item>
                  </Link>
                  <Link href="/history" passHref legacyBehavior>
                    <NavDropdown.Item
                      active={router.pathname === "/history"}
                      onClick={() => setIsExpanded(false)}
                      className={styles.navDropdownItem}
                    >
                      Search History
                    </NavDropdown.Item>
                  </Link>
                  <Link href="" passHref legacyBehavior>
                    <NavDropdown.Item
                      active={router.pathname === ""}
                      onClick={() => logout()}
                      className={styles.navDropdownItem}
                    >
                      Logout
                    </NavDropdown.Item>
                  </Link>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
