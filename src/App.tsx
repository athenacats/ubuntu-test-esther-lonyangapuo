import "./App.css";
import { useEffect, useState } from "react";

interface CardData {
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  featured_media: string;
  link: string;
  _embedded: {
    author: Array<{
      name: string;
      url: string;
    }>;
  };
  date: string;
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

  function formatDate(dateString: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const options: any = { day: "numeric", month: "long", year: "numeric" };
    const formatted = new Date(dateString).toLocaleDateString("en-US", options);
    const parts = formatted.replace(/,/, "").split(" ");
    return `${parts[1]} ${parts[0]} ${parts[2]}`;
  }

  return (
    <>
      {cardDataArray!.map((cardData, index) => (
        <div className="p-card" key={index}>
          <h3>CLOUD AND SERVER</h3>
          <hr className="u-sv1"></hr>
          <img
            src={cardData.featured_media}
            alt={cardData.title.rendered}
          ></img>
          <a href={cardData.link}>
            <h3>{cardData.title.rendered}</h3>
          </a>
          <p>
            By{" "}
            <a href={cardData._embedded.author[0].url}>
              {" "}
              {cardData._embedded.author[0].name}
            </a>{" "}
            on {formatDate(cardData.date)}
          </p>
          <p
            dangerouslySetInnerHTML={{ __html: cardData.excerpt.rendered }}
          ></p>
        </div>
      ))}
    </>
  );
}

export default App;
