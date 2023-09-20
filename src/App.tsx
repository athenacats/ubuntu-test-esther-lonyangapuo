import { Card } from "@canonical/react-components";
import "./App.css";
import { useEffect, useState } from "react";

interface CardData {
  title: string;
  imageSrc: string;
  imageAlt: string;
  content: string;
}

function App() {
  const [cardData, setCardData] = useState<CardData | null>(null);

  useEffect(() => {
    // Fetch the JSON data from the external URL
    fetch(
      "https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setCardData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return (
    <>
      <Card title={cardData?.title || "Loading..."}>{cardData?.content}</Card>
    </>
  );
}

export default App;
