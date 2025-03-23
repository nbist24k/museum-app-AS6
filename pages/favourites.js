import { useAtom } from "jotai";
import { favouritesAtom } from "../store";
import { Container, Row, Col, Alert } from "react-bootstrap";
import ArtworkCard from "../components/ArtworkCard";

export default function Favourites() {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  //const hasArtworks = favouritesList && favouritesList.length > 0;
  if (!favouritesList) return null;

  return (
    <Container className="min-vh-100">
      <Row className="my-4">
        <Col>
          <h1>Favourites</h1>
          <hr />
        </Col>
      </Row>

      {favouritesList.length === 0 ? (
        <Row>
          <Col>
            <Alert variant="info">
              <h4>Nothing Here</h4>
              <p>Try adding some new artwork to the list.</p>
            </Alert>
          </Col>
        </Row>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="gy-4">
          {favouritesList.map((objectID) => (
            <Col key={objectID}>
              <ArtworkCard objectID={objectID} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
