/*********************************************************************************
 *  WEB422 – Assignment 06
 *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part of this
 *  assignment has been copied manually or electronically from any other source (including web sites) or
 *  distributed to other students.
 *
 *  Name: Nirajan Bist Student ID: 157716226 Date: 2025/03/23
 *
 *  Vercel App (Deployed) Link: _____________________________________________________
 *
 ********************************************************************************/

import { Container, Row, Col, Image } from "react-bootstrap";

function HomePage() {
  return (
    <Container>
      <Row className="my-4">
        <Col>
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg"
            alt="The Metropolitan Museum of Art"
            fluid
            rounded
          />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <p>
            The Metropolitan Museum of Art of New York City, colloquially
            &ldquo;the Met,&rdquo; is the largest art museum in the United
            States. With 6.8 million visitors in 2019, it was the fourth most
            visited art museum in the world. Its permanent collection contains
            over two million works, divided among 17 curatorial departments.
          </p>
        </Col>
        <Col md={6}>
          <p>
            The main building, at the edge of Central Park along
            Manhattan&apos;s Museum Mile, is by area one of the world&apos;s
            largest art galleries. A much smaller second location, The Cloisters
            at Fort Tryon Park in Upper Manhattan, contains an extensive
            collection of art, architecture, and artifacts from Medieval Europe.
          </p>
          <p>
            Read more about the Met on{" "}
            <a
              href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art"
              target="_blank"
              rel="noreferrer"
            >
              Wikipedia
            </a>
            .
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
