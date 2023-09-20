import "./App.css";
import { useEffect, useState } from "react";

interface CardData {
  title: {
    rendered: string;
  };
  content: {
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

  function htmlToText(html: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }

  return (
    <>
      {cardDataArray!.map((cardData, index) => (
        <div
          className="p-card"
          key={index}
          title="CLOUD AND SERVER"

          //dangerouslySetInnerHTML={{ __html: cardData.content.rendered }}
        >
          <h3>CLOUD AND SERVER</h3>
          <hr className="u-sv1"></hr>
          {htmlToText(cardData.content.rendered)}
        </div>
      ))}
    </>
  );
}

export default App;
