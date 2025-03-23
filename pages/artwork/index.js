import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Container, Row, Col, Pagination, Alert } from "react-bootstrap";
import ArtworkCard from "../../components/ArtworkCard";
import Error from "next/error";
import validObjectIDList from "@/public/data/validObjectIDList.json";

const fetcher = (url) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Error fetching data");
    return res.json();
  });

const PER_PAGE = 12;

export default function Artwork() {
  const router = useRouter();
  const [artworkList, setArtworkList] = useState([]);
  const [page, setPage] = useState(1);

  // Get query string from URL
  const finalQuery = router.asPath.split("?")[1] || "";
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      const results = [];

      // Filter the search result to avoid the "not a valid object" case from the museum.
      let filteredResults = validObjectIDList.objectIDs.filter((x) =>
        data.objectIDs?.includes(x)
      );

      for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
        const chunk = filteredResults.slice(i, i + PER_PAGE);
        results.push(chunk);
      }
      setArtworkList(results);
      setPage(1); // Reset to first page whenever data changes
    }
  }, [data]);

  const previousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const nextPage = () => {
    if (page < artworkList.length) setPage(page + 1);
  };

  if (error) return <Error statusCode={404} />;
  if (!data) return <div>Loading...</div>; // Show loading state

  return (
    <Container className="min-vh-100">
      <Row className="my-4">
        <Col>
          <h1>Search Artwork</h1>
          <hr />
        </Col>
      </Row>
      <Row className="gy-4">
        {artworkList.length > 0 &&
          artworkList[page - 1].map((objectID) => (
            <Col lg={3} key={objectID}>
              <ArtworkCard objectID={objectID} />
            </Col>
          ))}
        {artworkList.length === 0 && (
          // <Card>
          //   <Card.Body>
          //     <h4>Nothing Here</h4>Try searching for something else.
          //   </Card.Body>
          // </Card>
          <Alert variant="info">
            <h4>Nothing Here</h4>Try searching for something else.
          </Alert>
        )}
      </Row>
      {artworkList.length > 0 && (
        <Row>
          <Col>
            <br />
            <Pagination>
              <Pagination.Prev onClick={previousPage} />
              <Pagination.Item>{page}</Pagination.Item>
              <Pagination.Next onClick={nextPage} />
            </Pagination>
          </Col>
        </Row>
      )}
    </Container>
  );
}
