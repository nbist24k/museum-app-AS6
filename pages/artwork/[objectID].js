import { useRouter } from "next/router";
import { Container, Row, Col } from "react-bootstrap";
import ArtworkCardDetail from "../../components/ArtworkCardDetail";

export default function ArtworkById() {
  const router = useRouter();
  const { objectID } = router.query; // This extracts "objectID" from the URL

  return (
    <Container>
      <Row>
        <Col>
          {/* Check if objectID exists before rendering the component */}
          {objectID && <ArtworkCardDetail objectID={objectID} />}
        </Col>
      </Row>
    </Container>
  );
}
