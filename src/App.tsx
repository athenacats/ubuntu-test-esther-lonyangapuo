import { Card } from "@canonical/react-components";
import "./App.css";
import { useEffect, useState } from "react";

interface CardData {
  title: {
    rendered: string;
  };
}

function App() {
  const [cardDataArray, setCardDataArray] = useState<CardData[]>([]);

  useEffect(() => {
    fetch(
      "https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json"
    )
      .then((response) => response.json())
      .then((data: CardData[]) => {
        console.log("Fetched data:", data);
        setCardDataArray(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return (
    <>
      {cardDataArray!.map((cardData, index) => (
        <Card
          key={index}
          title={cardData?.title.rendered || "Loading..."}
          //dangerouslySetInnerHTML={{ __html: cardData.content.rendered }}
        ></Card>
      ))}
    </>
  );
}

export default App;
