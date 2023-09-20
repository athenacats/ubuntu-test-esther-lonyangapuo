import "./App.css";

import { useEffect, useState } from "react";

interface CardData {
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  featured_media: string;
  link: string;
  _embedded: {
    author: Array<{
      name: string;
      url: string;
    }>;
    "wp:term": Array<
      Array<{
        id: number;
        link: string;
        name: string;
      }>
    >;
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
    <div className="row">
      {cardDataArray!.map((cardData, index) => (
        <div className="col-4" key={index}>
          <div className="p-card">
            <div className="p-card__content">
              <p className="u-align--left topic-title">
                {cardData._embedded["wp:term"][1]?.[0]?.name || "Topic"}
              </p>
              <hr className="u-sv1"></hr>

              <img
                className="p-card__image"
                height="185"
                width="330"
                src={cardData.featured_media}
                alt={cardData.title.rendered}
              ></img>
              <div className="p-card__inner card-details">
                <a href={cardData.link} className="card-title-link">
                  <h4 className="card-title u-align--left">
                    {cardData.title.rendered}
                  </h4>
                </a>
                <h6 className="u-align--left">
                  By{" "}
                  <a href={cardData._embedded.author[0].url}>
                    {" "}
                    {cardData._embedded.author[0].name}
                  </a>{" "}
                  on {formatDate(cardData.date)}
                </h6>
              </div>
              <hr className="u-sv1"></hr>
              <p
                className="u-align--left p-card__inner card-type u-no-padding--bottom"
                dangerouslySetInnerHTML={{
                  __html: cardData.content.rendered,
                }}
              ></p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
