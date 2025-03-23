import useSWR from "swr";
import { Card, Button } from "react-bootstrap";
import Error from "next/error";
// Import useAtom hook from jotai library and favouritesAtom from store.js
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { useEffect, useState } from "react";
//import { set } from "react-hook-form";
import { addToFavourites, removeFromFavourites } from "@/lib/userData";
//import { set } from "react-hook-form";

//const fetcher = (url) => fetch(url).then((res) => res.json());

function ArtworkCardDetail({ objectID }) {
  const { data, error } = useSWR(
    objectID
      ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
      : null //,
    //fetcher
  );

  // Get the favouritesAtom state and the setFavouritesAtom function
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  // Check if the objectID is already in the favourites list and set the state
  // const [showAdded, setShowAdded] = useState(favouritesList.includes(objectID));
  const [showAdded, setShowAdded] = useState(false);
  useEffect(() => {
    setShowAdded(favouritesList?.includes(objectID));
  }, [favouritesList]);

  // To be called when the favourites button is clicked
  // const favouritesClicked = () => {
  //   if (showAdded) {
  //     setFavouritesList(favouritesList.filter((id) => id !== objectID));
  //     setShowAdded(false);
  //   } else {
  //     setFavouritesList([...favouritesList, objectID]);
  //     setShowAdded(true);
  //   }
  // };
  const favouritesClicked = async () => {
    try {
      if (showAdded) {
        setFavouritesList(await removeFromFavourites(objectID));
        setShowAdded(false);
      } else {
        setFavouritesList(await addToFavourites(objectID));
        setShowAdded(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (error) return <Error statusCode={404} />;
  if (!data) return <Error statusCode={403} />; // Loading state

  return (
    <Card>
      {data.primaryImage && <Card.Img variant="top" src={data.primaryImage} />}
      <Card.Body>
        <Card.Title>{data.title || "N/A"}</Card.Title>
        <Card.Text>
          <strong>Date:</strong> {data.objectDate || "N/A"}
          <br />
          <strong>Classification:</strong> {data.classification || "N/A"}
          <br />
          <strong>Medium:</strong> {data.medium || "N/A"}
          <br />
          <strong>Artist:</strong> {data.artistDisplayName || "N/A"}
          {data.artistDisplayName && data.artistWikidata_URL && (
            <>
              {" "}
              (
              <a
                href={data.artistWikidata_URL}
                target="_blank"
                rel="noreferrer"
              >
                wiki
              </a>
              )
            </>
          )}
          <br />
          <strong>Credit Line:</strong> {data.creditLine || "N/A"}
          <br />
          <strong>Dimensions:</strong> {data.dimensions || "N/A"}
          <br />
          <br />
          <Button
            variant={showAdded ? "primary" : "outline-primary"}
            onClick={() => favouritesClicked()}
          >
            + Favourite {showAdded == "true" ? "(added)" : ""}
          </Button>
        </Card.Text>

        <Button variant="outline-info" onClick={() => window.history.back()}>
          Go Back
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ArtworkCardDetail;
